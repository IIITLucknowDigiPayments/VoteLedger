import { expect } from "chai";
import { ethers } from "hardhat";
import { ShadowVote } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("ShadowVote", function () {
  let shadowVote: ShadowVote;
  let owner: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let voter3: SignerWithAddress;

  beforeEach(async function () {
    // Get signers
    [owner, voter1, voter2, voter3] = await ethers.getSigners();

    // Deploy contract
    const ShadowVote = await ethers.getContractFactory("ShadowVote");
    shadowVote = await ShadowVote.deploy();
    await shadowVote.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await shadowVote.owner()).to.equal(owner.address);
    });

    it("Should initialize nextPollId to 0", async function () {
      expect(await shadowVote.nextPollId()).to.equal(0);
    });
  });

  describe("Creating Polls", function () {
    it("Should create a poll successfully", async function () {
      const question = "What is your favorite color?";
      const options = ["Red", "Blue", "Green"];
      const duration = 7 * 24 * 60 * 60; // 7 days

      await expect(shadowVote.createPoll(question, options, duration))
        .to.emit(shadowVote, "PollCreated")
        .withArgs(0, owner.address, question, options.length, (value: bigint) => value > 0);

      const poll = await shadowVote.getPoll(0);
      expect(poll.question).to.equal(question);
      expect(poll.options.length).to.equal(3);
      expect(poll.creator).to.equal(owner.address);
      expect(poll.isActive).to.be.true;
    });

    it("Should increment poll ID", async function () {
      await shadowVote.createPoll("Question 1", ["A", "B"], 0);
      await shadowVote.createPoll("Question 2", ["X", "Y"], 0);

      expect(await shadowVote.nextPollId()).to.equal(2);
    });

    it("Should reject empty question", async function () {
      await expect(
        shadowVote.createPoll("", ["A", "B"], 0)
      ).to.be.revertedWith("Question cannot be empty");
    });

    it("Should reject less than 2 options", async function () {
      await expect(
        shadowVote.createPoll("Question?", ["A"], 0)
      ).to.be.revertedWith("Must have at least 2 options");
    });

    it("Should reject more than 20 options", async function () {
      const tooManyOptions = Array(21).fill("Option");
      await expect(
        shadowVote.createPoll("Question?", tooManyOptions, 0)
      ).to.be.revertedWith("Maximum 20 options allowed");
    });

    it("Should reject empty options", async function () {
      await expect(
        shadowVote.createPoll("Question?", ["A", ""], 0)
      ).to.be.revertedWith("Option cannot be empty");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      // Create a poll before each test
      await shadowVote.createPoll("Favorite language?", ["JavaScript", "Python", "Rust"], 0);
    });

    it("Should allow voting on active poll", async function () {
      await expect(shadowVote.connect(voter1).vote(0, 0))
        .to.emit(shadowVote, "VoteCast")
        .withArgs(0, voter1.address, (value: bigint) => value > 0);

      const poll = await shadowVote.getPoll(0);
      expect(poll.counts[0]).to.equal(1);
    });

    it("Should prevent double voting", async function () {
      await shadowVote.connect(voter1).vote(0, 0);

      await expect(
        shadowVote.connect(voter1).vote(0, 1)
      ).to.be.revertedWith("Already voted in this poll");
    });

    it("Should reject invalid choice", async function () {
      await expect(
        shadowVote.connect(voter1).vote(0, 5)
      ).to.be.revertedWith("Invalid choice");
    });

    it("Should reject voting on non-existent poll", async function () {
      await expect(
        shadowVote.connect(voter1).vote(99, 0)
      ).to.be.revertedWith("Poll does not exist");
    });

    it("Should count votes correctly", async function () {
      await shadowVote.connect(voter1).vote(0, 0); // JavaScript
      await shadowVote.connect(voter2).vote(0, 1); // Python
      await shadowVote.connect(voter3).vote(0, 0); // JavaScript

      const results = await shadowVote.getPollResults(0);
      expect(results.counts[0]).to.equal(2); // JavaScript: 2
      expect(results.counts[1]).to.equal(1); // Python: 1
      expect(results.counts[2]).to.equal(0); // Rust: 0
      expect(results.totalVotes).to.equal(3);
    });
  });

  describe("Poll Management", function () {
    beforeEach(async function () {
      await shadowVote.createPoll("Question?", ["A", "B"], 0);
    });

    it("Should allow creator to close poll", async function () {
      await expect(shadowVote.closePoll(0))
        .to.emit(shadowVote, "PollClosed")
        .withArgs(0, owner.address);

      const poll = await shadowVote.getPoll(0);
      expect(poll.isActive).to.be.false;
    });

    it("Should prevent non-creator from closing poll", async function () {
      await expect(
        shadowVote.connect(voter1).closePoll(0)
      ).to.be.revertedWith("Only creator or owner can close poll");
    });

    it("Should allow owner to close any poll", async function () {
      // voter1 creates a poll
      await shadowVote.connect(voter1).createPoll("Question?", ["X", "Y"], 0);

      // owner can close it
      await expect(shadowVote.closePoll(1))
        .to.emit(shadowVote, "PollClosed")
        .withArgs(1, owner.address);
    });

    it("Should prevent voting on closed poll", async function () {
      await shadowVote.closePoll(0);

      await expect(
        shadowVote.connect(voter1).vote(0, 0)
      ).to.be.revertedWith("Poll is not active");
    });

    it("Should allow extending poll", async function () {
      const additionalTime = 3 * 24 * 60 * 60; // 3 days

      await expect(shadowVote.extendPoll(0, additionalTime))
        .to.emit(shadowVote, "PollExtended");

      const poll = await shadowVote.getPoll(0);
      expect(poll.endTime).to.be.gt(0);
    });
  });

  describe("Query Functions", function () {
    beforeEach(async function () {
      await shadowVote.createPoll("Question 1", ["A", "B"], 0);
      await shadowVote.createPoll("Question 2", ["X", "Y", "Z"], 0);
      await shadowVote.createPoll("Question 3", ["P", "Q"], 0);
      await shadowVote.closePoll(1); // Close second poll
    });

    it("Should get total polls", async function () {
      expect(await shadowVote.getTotalPolls()).to.equal(3);
    });

    it("Should get active polls only", async function () {
      const activePolls = await shadowVote.getActivePolls();
      expect(activePolls.length).to.equal(2);
      expect(activePolls).to.deep.equal([0n, 2n]);
    });

    it("Should check if poll is active", async function () {
      expect(await shadowVote.isPollActive(0)).to.be.true;
      expect(await shadowVote.isPollActive(1)).to.be.false;
      expect(await shadowVote.isPollActive(2)).to.be.true;
    });

    it("Should check if user has voted", async function () {
      await shadowVote.connect(voter1).vote(0, 0);

      expect(await shadowVote.hasVoted(0, voter1.address)).to.be.true;
      expect(await shadowVote.hasVoted(0, voter2.address)).to.be.false;
    });

    it("Should get polls with pagination", async function () {
      const pollsData = await shadowVote.getPolls(0, 2);

      expect(pollsData.ids.length).to.equal(2);
      expect(pollsData.questions.length).to.equal(2);
      expect(pollsData.creators.length).to.equal(2);
    });
  });

  describe("Time-based Polls", function () {
    it("Should reject voting after poll ends", async function () {
      // Create poll with 1 second duration
      await shadowVote.createPoll("Question?", ["A", "B"], 1);

      // Wait for poll to end
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        shadowVote.connect(voter1).vote(0, 0)
      ).to.be.revertedWith("Poll has ended");
    });

    it("Should allow voting before poll ends", async function () {
      // Create poll with 100 seconds duration
      await shadowVote.createPoll("Question?", ["A", "B"], 100);

      await expect(shadowVote.connect(voter1).vote(0, 0))
        .to.emit(shadowVote, "VoteCast");
    });
  });

  describe("Ownership", function () {
    it("Should transfer ownership", async function () {
      await shadowVote.transferOwnership(voter1.address);
      expect(await shadowVote.owner()).to.equal(voter1.address);
    });

    it("Should prevent non-owner from transferring ownership", async function () {
      await expect(
        shadowVote.connect(voter1).transferOwnership(voter2.address)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should reject zero address", async function () {
      await expect(
        shadowVote.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });
  });
});
