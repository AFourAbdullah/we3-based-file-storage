const { run } = require("hardhat");

const verify = async () => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: "0x6Df8AE80D7683fe820309557762ac07eEF8d8696",
      constructorArguments: [],
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

verify();

module.exports = {
  verify,
};
