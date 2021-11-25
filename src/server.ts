import dotenv from "dotenv"; // remove in production
dotenv.config(); // remove in production
import app from "./app";
import { connect } from "mongoose";
import { MONGODB_URI } from "./configs";

const main = async () => {
  await connect(MONGODB_URI);
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
