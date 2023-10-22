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
      const hash = await postAsOtherAccount.write.post(["Hello world!"]);
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await guestbook.read.posts([0n])).to.eql([
        getAddress(otherAccount.account.address),
        "Hello world!",
        "0x0000000000000000000000000000000000000000",
        "",
      ]);
    });
  });
});
