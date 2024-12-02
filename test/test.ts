import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

async function deployStakingToken() {
  const [stakingPoolOwner, alice, bob, carol] = await hre.ethers.getSigners();

  const StakingToken = await hre.ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy();

  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();

  const StakingPool = await hre.ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(stakingToken, rewardToken);

  return {
    stakingToken,
    rewardToken,
    stakingPool,
    stakingPoolOwner,
    alice,
    bob,
    carol,
  };
}

describe("Staking Pool Verify", function () {
  it("Should get the right result, happy path", async function () {
    const {
      stakingToken,
      rewardToken,
      stakingPool,
      stakingPoolOwner,
      alice,
      bob,
      carol,
    } = await loadFixture(deployStakingToken);

    const initStakingTokens = hre.ethers.parseEther("1000");
    await stakingToken
      .connect(stakingPoolOwner)
      .transfer(alice.address, initStakingTokens);

    expect(await stakingToken.balanceOf(alice)).to.equal(initStakingTokens);

    await stakingToken
      .connect(stakingPoolOwner)
      .transfer(bob.address, initStakingTokens);

    expect(await stakingToken.balanceOf(bob)).to.equal(initStakingTokens);

    await stakingToken
      .connect(stakingPoolOwner)
      .transfer(carol.address, initStakingTokens);

    expect(await stakingToken.balanceOf(carol)).to.equal(initStakingTokens);

    const initStakingReward = hre.ethers.parseEther("1000");
    await rewardToken
      .connect(stakingPoolOwner)
      .transfer(stakingPool, initStakingReward);

    expect(await rewardToken.balanceOf(stakingPool)).to.equal(
      initStakingReward
    );

    await stakingPool.setRewardsDuration(1000);
    await stakingPool.notifyRewardAmount(initStakingReward);

    const rewardRate = await stakingPool.rewardRate();

    console.log("rewardRate : ", rewardRate);

    const timeInterval = 2;

    const alice1stStaking = hre.ethers.parseEther("100");
    await stakingToken.connect(alice).approve(stakingPool, alice1stStaking);
    await stakingPool.connect(alice).stake(alice1stStaking);

    const nextTime = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime);

    const aliceEarned = await stakingPool.earned(alice);
    console.log("aliceEarned   : ", aliceEarned);

    const alice2ndStaking = hre.ethers.parseEther("100");
    await stakingToken.connect(alice).approve(stakingPool, alice2ndStaking);
    await stakingPool.connect(alice).stake(alice2ndStaking);

    const nextTime2 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime2);

    const aliceEarned2 = await stakingPool.earned(alice);
    console.log("aliceEarned2  : ", aliceEarned2);

    const bob1stStaking = hre.ethers.parseEther("200");
    await stakingToken.connect(bob).approve(stakingPool, bob1stStaking);
    await stakingPool.connect(bob).stake(bob1stStaking);

    const nextTime3 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime3);

    const bobEarned1 = await stakingPool.earned(bob);
    console.log("bobEarned1    : ", bobEarned1);

    const alice1stWithdraw = hre.ethers.parseEther("200");
    await stakingPool.connect(alice).withdraw(alice1stWithdraw);

    const nextTime4 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime4);

    const aliceEarned3 = await stakingPool.earned(alice);
    console.log("aliceEarned3  : ", aliceEarned3);

    const carol1stStaking = hre.ethers.parseEther("200");
    await stakingToken.connect(carol).approve(stakingPool, carol1stStaking);
    await stakingPool.connect(carol).stake(carol1stStaking);

    const nextTime5 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime5);

    const carolEarned1 = await stakingPool.earned(carol);
    console.log("carolEarned1  : ", carolEarned1);

    const carol2ndStaking = hre.ethers.parseEther("100");
    await stakingToken.connect(carol).approve(stakingPool, carol2ndStaking);
    await stakingPool.connect(carol).stake(carol2ndStaking);

    // const alice2ndWithdraw = hre.ethers.parseEther("100");
    // await stakingPool.connect(alice).withdraw(alice2ndWithdraw);

    const nextTime6 = (await time.latest()) + timeInterval * 2;
    await time.increaseTo(nextTime6);

    const carolEarned2 = await stakingPool.earned(carol);
    console.log("carolEarned2  : ", carolEarned2);

    const aliceEarned4 = await stakingPool.earned(alice);
    console.log("aliceEarned4  : ", aliceEarned4);

    const caro1stWithdraw = hre.ethers.parseEther("100");
    await stakingPool.connect(carol).withdraw(caro1stWithdraw);

    const nextTime7 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime7);

    const carolEarned3 = await stakingPool.earned(carol);
    console.log("carolEarned3  : ", carolEarned3);

    const bob1stWithdraw = hre.ethers.parseEther("200");
    await stakingPool.connect(bob).withdraw(bob1stWithdraw);

    const nextTime8 = (await time.latest()) + timeInterval * 3;
    await time.increaseTo(nextTime8);

    const bobEarned2 = await stakingPool.earned(bob);
    console.log("bobEarned2    : ", bobEarned2);

    const carol2ndWithdraw = hre.ethers.parseEther("200");
    await stakingPool.connect(carol).withdraw(carol2ndWithdraw);

    const nextTime9 = (await time.latest()) + timeInterval;
    await time.increaseTo(nextTime9);

    const carolEarned4 = await stakingPool.earned(carol);
    console.log("carolEarned4  : ", carolEarned4);

    // const aliceEarned = await stakingPool.earned(alice);

    // console.log("aliceEarned ", aliceEarned);

    // const nextTime = (await time.latest()) + 5;
    // await time.increaseTo(nextTime);

    // const aliceEarned2 = await stakingPool.earned(alice);

    // console.log("aliceEarned2 ", aliceEarned2);
  });
});
