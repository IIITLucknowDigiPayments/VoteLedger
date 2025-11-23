import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting ShadowVote contract deployment...");

  // Get the contract factory
  const ShadowVote = await ethers.getContractFactory("ShadowVote");
  
  // Deploy the contract
  console.log("Deploying contract...");
  const shadowVote = await ShadowVote.deploy();
  
  // Wait for deployment to finish
  await shadowVote.waitForDeployment();
  
  const contractAddress = await shadowVote.getAddress();
  console.log("ShadowVote deployed to:", contractAddress);

  // Get deployer address
  const [deployer] = await ethers.getSigners();
  console.log("Deployed by:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    contractName: "ShadowVote",
  };

  // Save to deployments folder
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(
    deploymentsDir,
    `deployment-${Date.now()}.json`
  );
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to:", deploymentFile);

  // Save latest deployment address
  const latestFile = path.join(deploymentsDir, "latest.json");
  fs.writeFileSync(latestFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("Latest deployment saved to:", latestFile);

  // Export ABI for frontend
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "ShadowVote.sol",
    "ShadowVote.json"
  );
  
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const abiExportPath = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
    
    if (!fs.existsSync(abiExportPath)) {
      fs.mkdirSync(abiExportPath, { recursive: true });
    }
    
    const abiFile = path.join(abiExportPath, "ShadowVote.json");
    fs.writeFileSync(
      abiFile,
      JSON.stringify(
        {
          address: contractAddress,
          abi: artifact.abi,
        },
        null,
        2
      )
    );
    console.log("ABI exported to frontend:", abiFile);
  }

  console.log("\n✅ Deployment completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Update the CONTRACT_ADDRESS in frontend/src/services/ShadowVoteService.ts");
  console.log(`   CONTRACT_ADDRESS = "${contractAddress}"`);
  console.log("2. If deploying to testnet/mainnet, verify the contract:");
  console.log(`   npx hardhat verify --network <network> ${contractAddress}`);
  
  return contractAddress;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
