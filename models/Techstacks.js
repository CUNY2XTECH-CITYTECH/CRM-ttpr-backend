import mongoose from "mongoose";

const techStacksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const TechStacks = mongoose.model("TechStacks", techStacksSchema);
export default TechStacks;