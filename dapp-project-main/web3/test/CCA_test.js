const StudentDetails = artifacts.require("StudentDetails");

contract("StudentDetails", accounts => {
  it("should register a new student", async () => {
    const studentDetails = await StudentDetails.new();
    
    await studentDetails.registerStudent("Tandin", 123, { from: accounts[0] });
    
    const { name, cid, programsAttended, totalPoints } = await studentDetails.getStudentDetails(123, { from: accounts[0] });
    
    assert.equal(name, "Tandin", "Name should be Tandin");
    assert.equal(cid, 123, "CID should be 123");
    assert.equal(programsAttended.length, 0, "No programs should be attended");
    assert.equal(totalPoints, 0, "Total points should be 0");
  });
  it("should attend a program", async () => {
    const studentDetails = await StudentDetails.new();
    
    await studentDetails.registerStudent("Drukden", 456, { from: accounts[0] });
    
    await studentDetails.attendProgram("Marathon", { from: accounts[0] });
    
    const { name, cid, programsAttended, totalPoints } = await studentDetails.getStudentDetails(456, { from: accounts[0] });
    
    assert.equal(programsAttended.length, 1, "One program should be attended");
    assert.equal(programsAttended[0], "Marathon", "Program attended should be Marathon");
    assert.equal(totalPoints, 1, "Total points should be 1");
    
    await studentDetails.attendProgram("Teachers day", { from: accounts[0] });
    
    const { programsAttended: programsAttended2, totalPoints: totalPoints2 } = await studentDetails.getStudentDetails(456, { from: accounts[0] });
    
    assert.equal(programsAttended2.length, 2, "Two programs should be attended");
    assert.equal(programsAttended2[0], "Marathon", "Program attended should be Marathon");
    assert.equal(programsAttended2[1], "Teachers day", "Program attended should be Teachers day");
    assert.equal(totalPoints2, 2, "Total points should be 2");

    try {
      await studentDetails.attendProgram("Marathon", { from: accounts[0] });
      assert.fail("Attending the same program twice should fail");
    } catch (error) {
      assert.include(error.message, "revert", "Attending the same program twice should revert");
    }
  });
});