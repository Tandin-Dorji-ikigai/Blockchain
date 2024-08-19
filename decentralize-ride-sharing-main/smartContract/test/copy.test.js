// const MarkList = artifacts.require('MarkList')
// const StudentList = artifacts.require("StudentList")
// const SubjectList = artifacts.require("SubjectList")



// contract('MarkList',(account)=>{
//     let studentList
//     let subjectList
//     let markList

//     beforeEach(async()=>{
//         this.markList = await MarkList.deployed()
//         studentList = await StudentList.deployed()
//         subjectList = await SubjectList.deployed()
//         markList = await MarkList.deployed()



//     })

//     console.log(StudentList._json.contractName)

//     it('check deployment based on name',async()=>{
//         assert.equal(MarkList._json.contractName,"MarkList","MarkListContract is correct")
//         assert.equal(SubjectList._json.contractName,"SubjectList","MarkListContract is correct")
//         assert.equal(StudentList._json.contractName,"StudentList","MarkListContract is correct")

//     })

//     it('check address', async () => {
//         const address = await this.markList.address
//         isValidAddress(address)
//     })

//     // console.log(StudentList)
//     describe('Student',async()=>{
//         let result;
//         it('add student ',async()=>{
//             let name = ["dhendup","tshering","karma","tshewang","samdrup"];
//             for(let i = 0;i<name.length;i++){
//                 await studentList.createStudent(i,name[i]);
//             }
//             // console.log(await studentList.studentCount())
//             let person = await studentList.findStudent(3)
//             assert.equal(person._id,3)
//             assert.equal(person.cid,2)
//             assert.equal(person.name,"karma")
//             assert.equal(person.graduated,false)




//         })
//         it('add subject',async()=>{
//             let code = ["ELE202","CSB201","DZO"]
//             let module_name = ["cyber","introduction to blockchain","Dzongkha"]
//             for(let i = 0;i<code.length;i++){
//                 await subjectList.createSubject(code[i],module_name[0])
//             }
//             let subject = await subjectList.fineSubject(1);
//             assert.equal(subject._id,1)
//             assert.equal(subject.code,'ELE202')
//             assert.equal(subject.name,'cyber')
//             assert.equal(subject.retired,false)

//         })

//         it('add marks',async()=>{
//             await markList.addMarks(0,'ELE202',MarkList.Grades.A)
//             await markList.addMarks(2,'DZO',MarkList.Grades.C)
//             await markList.addMarks(1,'DZO',MarkList.Grades.FAIL)


//             let grade = await markList.findMarks(1,'DZO')
//             console.log(grade.grades)
//             assert.equal(grade.grades,MarkList.Grades.FAIL,"correct grading")
//             // assert.equal(grade)
            
//         })
//         // it("find marklist",async()=>{
//         //     let grade = await markList.findMarks(1,'DZO')
//         //     console.log(grade)
//         //     console.log(await markList.findMarks(0,'ELE202'))
//         //     console.log(await markList.findMarks(2,'DZO'))



//         // })
//         it("test updateMarks",async()=>{
//             let target = await markList.findMarks(0,'ELE202')
//             assert.equal(target.cid,0,"cid is correct")
//             assert.equal(target.code,"ELE202","code is correct is correct")
//             assert.equal(target.code,"ELE202","code is correct is correct")
//             assert.equal(target.grades,0,"grades is correct is correct")
//             await markList.updateMarks(0,'ELE202',MarkList.Grades.C).then(async()=>{
//                 let updatedValue = await markList.findMarks(0,'ELE202')
//                 assert.equal(updatedValue.cid,0,"cid is correct")
//                 assert.equal(updatedValue.code,"ELE202","code is correct is correct")
//                 assert.equal(updatedValue.code,"ELE202","code is correct is correct")
//                 assert.equal(updatedValue.grades,2,"grades is correct is correct")

//             })
//             // let updatedValue = await markList.updateMarks(0,'ELE202',MarkList.Grades.C)
//             // console.log(updatedValue.logs[0].args)


            
            

//         })
//     })


// })

// function isValidAddress(address){
//     assert.notEqual(address, 0x0)
//     assert.notEqual(address,'')
//     assert.notEqual(address,null)
//     assert.notEqual(address,undefined)
// }