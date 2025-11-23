import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interacting with contracts using account:", deployer.address);

  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

  // Get the contract
  const ShadowVote = await ethers.getContractAt("ShadowVote", CONTRACT_ADDRESS);

  console.log("\n📊 Contract Information:");
  console.log("------------------------");
  console.log("Contract Address:", await ShadowVote.getAddress());
  console.log("Owner:", await ShadowVote.owner());
  console.log("Next Poll ID:", await ShadowVote.nextPollId());

  // Example: Create a poll
  console.log("\n🗳️  Creating a sample poll...");
  const question = "What is your favorite blockchain?";
  const options = ["Ethereum", "Polygon", "Arbitrum", "Optimism"];
  const duration = 7 * 24 * 60 * 60; // 7 days in seconds

  const tx = await ShadowVote.createPoll(question, options, duration);
  const receipt = await tx.wait();
  
  console.log("Poll created! Transaction hash:", receipt?.hash);

  // Get the poll ID from the event
  const pollCreatedEvent = receipt?.logs
    .map((log: any) => {
      try {
        return ShadowVote.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((event: any) => event?.name === "PollCreated");

  if (pollCreatedEvent) {
    const pollId = pollCreatedEvent.args.pollId;
    console.log("Created Poll ID:", pollId.toString());

    // Get poll details
    console.log("\n📋 Poll Details:");
    const poll = await ShadowVote.getPoll(pollId);
    console.log("Question:", poll.question);
    console.log("Options:", poll.options);
    console.log("Creator:", poll.creator);
    console.log("Is Active:", poll.isActive);
    console.log("Created At:", new Date(Number(poll.createdAt) * 1000).toLocaleString());
    console.log("End Time:", new Date(Number(poll.endTime) * 1000).toLocaleString());

    // Example: Vote on the poll (uncomment to test)
    // console.log("\n🗳️  Casting a vote...");
    // const voteTx = await ShadowVote.vote(pollId, 0); // Vote for option 0
    // await voteTx.wait();
    // console.log("Vote cast successfully!");

    // Get poll results
    console.log("\n📊 Poll Results:");
    const results = await ShadowVote.getPollResults(pollId);
    console.log("Options:", results.options);
    console.log("Counts:", results.counts.map(c => c.toString()));
    console.log("Total Votes:", results.totalVotes.toString());
  }

  // Get all active polls
  console.log("\n🔍 Active Polls:");
  const activePolls = await ShadowVote.getActivePolls();
  console.log("Active Poll IDs:", activePolls.map(id => id.toString()));

  console.log("\n✅ Interaction completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
