const RideContract = artifacts.require("./Ride.sol")
const BanningContract = artifacts.require("./BanningContract.sol")
module.exports = function(deployer){
    deployer.deploy(RideContract)
    deployer.deploy(BanningContract)
}

