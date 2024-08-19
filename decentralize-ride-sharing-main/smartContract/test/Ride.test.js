const Ride = artifacts.require('Ride')
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { expect } = chai;



contract("Ride",(account)=>{
    
    beforeEach(async()=>{
        this.ride = await Ride.deployed()
    })
    console.log(Ride._json.contractName)
    it('check deployment based on name',async()=>{
        assert.equal(Ride._json.contractName,"Ride","MarkListContract is correct")
    })
    it('check address', async () => {
        const address = await this.ride.address
        isValidAddress(address)
    })

    describe("makeRide",async()=>{
        it('make ride request',async()=>{
            await this.ride.makeTrip(
                "Pick up location",
                "Drop off location",
                "2023-05-08",
                "10:00",{from:account[1]}
            );
            const trip = await this.ride.trips(0);
            assert.equal(trip.rideId, 1);
            assert.equal(trip.riderAddress, account[1]);
            assert.equal(trip.pickUpLocation, "Pick up location");
            assert.equal(trip.dropOffLocation, "Drop off location");
            assert.equal(trip.pickUpDate, "2023-05-08");
            assert.equal(trip.pickUpTime, "10:00");
            assert.equal(trip.requestStatus, 0);
            assert.equal(trip.driverAddress, "0x0000000000000000000000000000000000000000");
        })
        it("check double request",async()=>{
            await expect(this.ride.makeTrip(
                "Pick up location",
                "Drop off location",
                "2023-05-08",
                "10:00",
                {from:account[1]}
            )).to.be.rejectedWith("you cannot make new request");
        })
    })
    describe("accept Ride",async()=>{
        it("check rider cannot accept",async()=>{
            await expect(this.ride.acceptRequest(1,{from:account[1]})).to.be.rejectedWith("the rider cannot accept the request");
        })
        it("accept the ride request by driver",async()=>{
            await this.ride.acceptRequest(1,{from:account[2]})
            const trip = await this.ride.trips(0);
            assert.equal(trip.rideId, 1);
            assert.equal(trip.riderAddress, account[1]);
            assert.equal(trip.pickUpLocation, "Pick up location");
            assert.equal(trip.dropOffLocation, "Drop off location");
            assert.equal(trip.pickUpDate, "2023-05-08");
            assert.equal(trip.pickUpTime, "10:00");
            assert.equal(trip.requestStatus, 1);
            assert.equal(trip.driverAddress, account[2]);
        })
        it("accepting the request that already accepted",async()=>{
            await expect(this.ride.acceptRequest(1,{from:account[2]})).to.be.rejectedWith("The status should be pending");
        })
        it("tripCompleted()",async()=>{
            await this.ride.tripCompleted({from:account[2]})
            const index = await this.ride.getLatestTripForDriver({from:account[2]})
            const trip = await this.ride.trips(index)
            assert.equal(trip.requestStatus, 4);
            assert.equal(trip.driverAddress, account[2]);
        })
        
    })
    describe("related to status",async()=>{
        it("rider canceling the ride request",async()=>{
            await this.ride.makeTrip(
                "thimphu",
                "paro",
                "2023-05-08",
                "10:00",{from:account[1]}
            );
            await this.ride.cancelRiderRequest("i am busy",{from:account[1]})
            const trip = await this.ride.trips(await this.ride.getLatestTripForRider({from:account[1]}));
            assert.equal(trip.rideId, 2);
            assert.equal(trip.riderAddress, account[1]);
            assert.equal(trip.pickUpLocation, "thimphu");
            assert.equal(trip.dropOffLocation, "paro");
            assert.equal(trip.pickUpDate, "2023-05-08");
            assert.equal(trip.pickUpTime, "10:00");
            assert.equal(trip.requestStatus, 3);
            assert.equal(trip.driverAddress, "0x0000000000000000000000000000000000000000");

            const reason =await this.ride.riderCancelReason(2,{from:account[1]})
            assert.equal(reason,"i am busy")
        })
        it("cancelDriverRequest()",async()=>{
            await this.ride.makeTrip(
                "punakha",
                "trongsa",
                "2023-05-04",
                "11:00",{from:account[1]}
            );
            await this.ride.acceptRequest(3,{from:account[4]})
            await this.ride.cancelDriverRequest("i am sick",{from:account[4]})
            const trip = await this.ride.trips(await this.ride.getLatestTripForDriver({from:account[4]}))
            assert.equal(trip.rideId, 3);
            assert.equal(trip.riderAddress, account[1]);
            assert.equal(trip.pickUpLocation, "punakha");
            assert.equal(trip.dropOffLocation, "trongsa");
            assert.equal(trip.pickUpDate, "2023-05-04");
            assert.equal(trip.pickUpTime, "11:00");
            assert.equal(trip.requestStatus, 2);
            assert.equal(trip.driverAddress, account[4]);

            const reason = await this.ride.driverCancelReason(3,{from:account[4]})
            assert.equal(reason,"i am sick")
        })
    })
})
function isValidAddress(address){
    assert.notEqual(address, 0x0)
    assert.notEqual(address,'')
    assert.notEqual(address,null)
    assert.notEqual(address,undefined)
}


         // console.log(await this.ride.trips(0))
            // console.log(await this.ride.trips(1))
            // console.log(await this.ride.trips(2))
            // const a = await this.ride.getLatestTripForRider({from:account[1]});
            // console.log(await this.ride.trips(a.toNumber()))
            // console.log("index---",await this.ride.getLatestTripForRider({from:account[1]}))
            // console.log("trip----",await this.ride.trips(await this.ride.getLatestTripForRider({from:account[1]})))
            // console.log(await this.ride.getIdOFLatestRiderRifeID({from:account[1]}))