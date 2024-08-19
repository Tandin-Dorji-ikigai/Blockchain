var Token = artifacts.require("DonationToken");
module.exports = function (deployer) {
    deployer.deploy(Token);
};