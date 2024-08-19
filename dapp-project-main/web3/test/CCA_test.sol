//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/StudentDetails.sol";

contract TestStudentDetails {
    function testRegisterStudent() public {
        StudentDetails studentDetails = new StudentDetails();
        
        studentDetails.registerStudent("Tandin", 123);
        
        (string memory name, uint cid, string[] memory programsAttended, uint totalPoints) = studentDetails.getStudentDetails(123);
        
        Assert.equal(name, "Tandin", "Name should be Tandin");
        Assert.equal(cid, 123, "CID should be 123");
        Assert.equal(programsAttended.length, 0, "No programs should be attended");
        Assert.equal(totalPoints, 0, "Total points should be 0");
    }
    function testAttendProgram() public {
        StudentDetails studentDetails = new StudentDetails();
        
        studentDetails.registerStudent("Drukden", 456);
        studentDetails.attendProgram("Teachers day");
        
        (string memory name, uint cid, string[] memory programsAttended, uint totalPoints) = studentDetails.getStudentDetails(456);
        
        Assert.equal(programsAttended.length, 1, "One program should be attended");
        Assert.equal(programsAttended[0], "Teachers day", "Program attended should be Teachers day");
        Assert.equal(totalPoints, 1, "Total points should be 1");
        
        studentDetails.attendProgram("Marathon");
        
        (name, cid, programsAttended, totalPoints) = studentDetails.getStudentDetails(456);
        
        Assert.equal(programsAttended.length, 2, "Two programs should be attended");
        Assert.equal(programsAttended[0], "Teachers day", "Program attended should be Math");
        Assert.equal(programsAttended[1], "Marathon", "Program attended should be Marathon");
        Assert.equal(totalPoints, 2, "Total points should be 2");
        
        // Trying to attend the same program again should fail
        bool success = address(studentDetails).call(abi.encodeWithSignature("attendProgram(string)", "Teachers day"));
        Assert.isFalse(success, "Attending the same program twice should fail");
    }
}



