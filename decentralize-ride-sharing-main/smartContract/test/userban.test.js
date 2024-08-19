const BanningContract = artifacts.require('BanningContract');

contract('BanningContract', (accounts) => {
  let banningContract;

  before(async () => {
    banningContract = await BanningContract.new();
  });

  it('should register a user', async () => {
    await banningContract.registerUser();
    const totalMember = await banningContract.totalMember();
    assert.equal(totalMember, 1);
  });

  it('should rate a user', async () => {
    await banningContract.registerUser({ from: accounts[1] });
    await banningContract.rateUser(accounts[0], 4, { from: accounts[1] });
    const userRating = await banningContract.users(1);
    assert.equal(userRating.rating, 0);
  });

  it('should vote to ban a user', async () => {
    await banningContract.voteToBanUser(accounts[0], { from: accounts[1] });
    const banVotes = await banningContract.bannedStatus(accounts[0]);
    assert.equal(banVotes.yes, 1);
  });

  it('should wait for ban voting period to end', async () => {
    const banEndTime = await banningContract.users(1).banEndTime;
    const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp
    const delay = banEndTime - currentTime + 1; // Add 1 second buffer

    await new Promise(resolve => setTimeout(resolve, delay * 1000));
  });

//   it('should ban a user', async () => {
//     await banningContract.banUser(accounts[0], { from: accounts[1] });
//     const bannedUser = await banningContract.users(1);
//     assert.equal(bannedUser.banned, true);
//   });

  it('should unban a user', async () => {
    await banningContract.unbanUser(accounts[0], { from: accounts[1] });
    const unbannedUser = await banningContract.users(1);
    assert.equal(unbannedUser.banned, false);
  });
});
