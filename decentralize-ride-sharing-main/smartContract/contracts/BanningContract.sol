//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract BanningContract {
  uint public totalMember;
  struct User{
    address userAddress;
    uint rating;
    bool banned;
    uint banStartTime;
    uint banEndTime;
    uint totalNumberOfVoter;
    uint banDuration;
    bool preventAccess;
  }

  mapping (address => uint) public sumOfTheVote;
  mapping (address => uint) public tractRegisteredID;
  mapping (uint => User) public  users;


  constructor(){
    totalMember = 0;
  }
  function registerUser() public {
    require(tractRegisteredID[msg.sender]==0,"Already registered");
    totalMember++;
    users[totalMember] = User({
      userAddress:msg.sender,
      rating:5,
      banned:false,
      banStartTime:0,
      banEndTime:0,
      totalNumberOfVoter:0,
      banDuration:0,
      preventAccess:false
    });
    tractRegisteredID[msg.sender]=totalMember;
    sumOfTheVote[msg.sender] = 0;
  }
  function rateUser(address targetAddress,uint rate)public {
    require(tractRegisteredID[msg.sender]>0, "User is not registered");
    require(tractRegisteredID[targetAddress] > 0, "Target user is not registered");
    require(users[tractRegisteredID[targetAddress]].banned==false, "Your Are in Voting Session");
    require(rate<=5 || rate >=1,"invalid Rate");
    sumOfTheVote[targetAddress] += rate;
    uint newRating = (sumOfTheVote[targetAddress]*1000/((users[tractRegisteredID[targetAddress]].totalNumberOfVoter+1)*5))*10;
    users[tractRegisteredID[targetAddress]].rating = (newRating/1000);
    users[tractRegisteredID[targetAddress]].totalNumberOfVoter=users[tractRegisteredID[targetAddress]].totalNumberOfVoter+1;

    if(users[tractRegisteredID[targetAddress]].rating<4){
      users[tractRegisteredID[targetAddress]].banned = true;
      users[tractRegisteredID[targetAddress]].banStartTime=block.timestamp;
      users[tractRegisteredID[targetAddress]].banEndTime=block.timestamp + 5 minutes;
    }
  }
  function getCurrentTime() public view returns(uint){
      return block.timestamp;
  }
  function unBannedUser(address targetAddress) public {
    require(block.timestamp >= users[tractRegisteredID[targetAddress]].banEndTime ,"unbanning period not over");
    users[tractRegisteredID[targetAddress]].banned = false;
    users[tractRegisteredID[targetAddress]].banDuration = 0;
    users[tractRegisteredID[targetAddress]].preventAccess = false;
    users[tractRegisteredID[targetAddress]].banned = false;
    users[tractRegisteredID[targetAddress]].banStartTime = 0;
    users[tractRegisteredID[targetAddress]].banEndTime = 0;
    users[tractRegisteredID[targetAddress]].totalNumberOfVoter = 0;
    sumOfTheVote[targetAddress] = 0;
  }
}