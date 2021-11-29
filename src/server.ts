import dotenv from "dotenv"; // remove in production
dotenv.config(); // remove in production
import "module-alias/register";
import app from "./app";
import { connect } from "mongoose";
import GC from "./configs";

Object.keys(GC).forEach((key) => {
  // make sure the env is loaded and all constants are valid
  // accept number 0, null and boolean false, but reject empty string.
  if (GC[key] === undefined || GC[key] === "") {
    throw new Error(`${key} is invalid!`);
  }
});

const main = async () => {
  await connect(GC.MONGODB_URI);
  console.log("Database connected");
  app.listen(5000, () => console.log("server started"));
};

main();

process.on("unhandledRejection", (_e: any) => {
  const e: Error = _e;
  console.log(e.message);
  console.log("-------------------------------------");
  process.exit(1);
});
