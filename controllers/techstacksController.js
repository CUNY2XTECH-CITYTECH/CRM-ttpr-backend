import mongoose from 'mongoose';
const TechStacksSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
}})

const TechStacks = mongoose.model('TechStacks', TechStacksSchema);
export default TechStacks;
