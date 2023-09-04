import mongoose from "mongoose";
import { MONGODB_URI } from "../src/config";

try {
  mongoose.connect(MONGODB_URI);
} catch (error) {
  console.log(error);
}
