import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Guestbook", function () {
  async function fixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const guestbook = await hre.viem.deployContract("Guestbook");
    const publicClient = await hre.viem.getPublicClient();

    return {
      guestbook,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should write a new post", async function () {
      const { guestbook, owner, otherAccount, publicClient } =
        await loadFixture(fixture);

      const postAsOtherAccount = await hre.viem.getContractAt(
        "Guestbook",
        guestbook.address,
        { walletClient: otherAccount }
      );
      await postAsOtherAccount.write.post(["Hello world!"]);
      expect(await guestbook.read.posts([0n])).to.eql([
        getAddress(otherAccount.account.address),
        "Hello world!",
        "0x0000000000000000000000000000000000000000",
        "",
      ]);

      const postAsOwner = await hre.viem.getContractAt(
        "Guestbook",
        guestbook.address,
        { walletClient: owner }
      );
      await postAsOwner.write.post(["Hello world again!"]);
      expect(await guestbook.read.posts([1n])).to.eql([
        getAddress(owner.account.address),
        "Hello world again!",
        "0x0000000000000000000000000000000000000000",
        "",
      ]);

      expect(await guestbook.read.count()).to.equal(2n);
    });
  });
});
