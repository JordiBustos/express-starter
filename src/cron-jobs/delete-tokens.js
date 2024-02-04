import cron from "node-cron";
import Token from "../models/Token.model.js";

const deleteTokenJob = cron.schedule(
  "0 2 * * *",
  async function () {
    console.log("----------------------------------------");
    console.log("Deleting all Tokens from database 02:00");
    console.log("----------------------------------------");

    try {
      await Token.truncate();
      console.log("----------------------------------------");
      console.log("All Tokens deleted from database");
      console.log("----------------------------------------");
    } catch (err) {
      console.log("Error: ", err);
    }
  },
  { timezone: "UTC" },
);

export default deleteTokenJob;
