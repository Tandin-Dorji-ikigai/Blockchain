// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Ride{
    Trip[] public  trips;
    address public  admin;
    uint public  tripRequestCount;
    mapping (uint => string) public riderCancelReason;
    mapping (uint => string) public driverCancelReason;
    mapping (address => uint[]) public tripForRider;
    mapping (address => uint[]) public tripForDriver;
    enum Status{
        pending,accepted,rejected,canceled,done,payed
    }
    struct Trip{
        uint rideId;
        address riderAddress;
        string pickUpLocation;
        string dropOffLocation;
        string pickUpDate;
        string pickUpTime;
        Status requestStatus;
        address driverAddress;
        string remark;
    }
    constructor(){
        admin = msg.sender;
        tripRequestCount = 0;
    }
    
    event createTripEvent(
        uint rideId,
        address riderAddress,
        string pickUpLocation,
        string dropOffLocation,
        string pickUpDate,
        string pickUpTime,
        Status requestStatus
    );

    event updaterequestStatus(
         uint rideId
    );
    function makeTrip(
        string memory _pickUpLocation,
        string memory _dropOffLocation,
        string memory _pickUpDate,
        string memory _pickUpTime) public{
            if (tripForRider[msg.sender].length > 0){
                require(trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus==Status.canceled ||
                trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus==Status.rejected || 
                trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus==Status.done || 
                trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus==Status.payed,"you cannot make new request");
                require(trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus==Status.payed,"Make PayMent For Previous Trip");
            }
            tripRequestCount++;
            trips.push(Trip(tripRequestCount,msg.sender,_pickUpLocation,_dropOffLocation,_pickUpDate,_pickUpTime,Status.pending,address(0),""));
            tripForRider[msg.sender].push(tripRequestCount);
            emit createTripEvent(tripRequestCount,msg.sender, _pickUpLocation,_dropOffLocation, _pickUpDate,_pickUpTime,Status.pending);
    }

    event acceptRequestEvent(
        address driverAddress,
        uint rideID
    );
    function acceptRequest(uint _riderId)public {
        if(tripForDriver[msg.sender].length >= 1){
            require(trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus == Status.done ||
            trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus == Status.rejected ||
            trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus == Status.canceled ||
            trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus == Status.payed,"previous trip is pending");
        }
        require(trips[_riderId-1].riderAddress != msg.sender,"the rider cannot accept the request");
        require(trips[_riderId-1].requestStatus != Status.accepted,"The status should be pending");
        trips[_riderId-1].requestStatus=Status.accepted;
        trips[_riderId-1].driverAddress = msg.sender;
        tripForDriver[msg.sender].push(trips[_riderId-1].rideId);
        emit acceptRequestEvent(msg.sender,trips[_riderId-1].rideId);
    }

    event cancelRiderRequestEvent(
        address driverAddress,
        uint rideID,
        string reason
    );
    function cancelRiderRequest(string memory reason) public{
        require(trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus != Status.canceled,"the request is already cancelled");
        trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus=Status.canceled;
        riderCancelReason[trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].rideId] = reason;
        emit cancelRiderRequestEvent(
            msg.sender,
            trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].rideId,
            reason
        );
    }

    event tripCompletedEvent(address riderAddress, address driverAddress );
    function tripCompleted() public {
        trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus=Status.done;
        emit tripCompletedEvent(trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].riderAddress,
        trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].driverAddress);
    }



    event cancelDriverRequestEvent(
        address driverAddress,
        uint rideID,
        string reason
    );
    function cancelDriverRequest(string memory reason) public{
        require(trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus!= Status.rejected);
        trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].requestStatus=Status.rejected;
        driverCancelReason[trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].rideId] = reason;
        emit cancelDriverRequestEvent(
            msg.sender,
            trips[tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1].rideId,
            reason
        );
    }

    function payment(string memory _remark) public payable  {
        // require(condition);
        address payable driverAddress = payable(trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].driverAddress);
        driverAddress.transfer(msg.value);
        trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].requestStatus = Status.payed;
        trips[tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1].remark = _remark;
    }


    function getLatestTripForRider() public view returns(uint) {
        // return tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1;
        return tripForRider[msg.sender][tripForRider[msg.sender].length-1]-1;
    }
    function getLatestTripForDriver() public view returns(uint) {
        return tripForDriver[msg.sender][tripForDriver[msg.sender].length-1]-1;
    }
}