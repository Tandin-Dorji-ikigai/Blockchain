// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract StudentDetails {
    uint256 public studentCount;
    struct Program {
        string programName;
        uint256 pointsEarned;
        string date;
    }

    uint256[] public studentIDs;

    struct Student {
        string name;
        uint256 cid;
        Program[] programsAttended;
        mapping(string => bool) programExist;
        uint256 totalPoints;
        string course;
    }

    mapping(uint256 => Student) public students;

    function registerStudent(
        string memory _name,
        uint256 _cid,
        string memory _programName,
        string memory _date,
        string memory _course
    ) public {
        studentCount++;
        require(students[_cid].cid == 0, "Student already registered");

        Student storage newStudent = students[_cid];
        newStudent.name = _name;
        newStudent.cid = _cid;
        newStudent.course = _course;
        studentIDs.push(_cid);
        attendProgram(_cid, _programName, _date);
    }

    function attendProgram(
        uint256 _cid,
        string memory _programName,
        string memory _date
    ) public {
        Student storage student = students[_cid];

        require(
            !student.programExist[_programName],
            "Program already attended"
        );
        student.programExist[_programName] = true;

        Program memory newProgram = Program(_programName, 1, _date);
        student.programsAttended.push(newProgram);
        student.totalPoints++;
    }

    function getStudentDetails(uint256 _cid)
        public
        view
        returns (
            string memory,
            uint256,
            string[] memory,
            string[] memory,
            uint256,
            string memory
        )
    {
        Student storage student = students[_cid];
        string[] memory programNames = new string[](
            student.programsAttended.length
        );
        string[] memory programDates = new string[](
            student.programsAttended.length
        );

        for (uint256 i = 0; i < student.programsAttended.length; i++) {
            programNames[i] = student.programsAttended[i].programName;
            programDates[i] = student.programsAttended[i].date;
        }

        return (
            student.name,
            student.cid,
            programNames,
            programDates,
            student.totalPoints,
            student.course
        );
    }
}
