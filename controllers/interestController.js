import Interest from "../models/interest.js";
import { catchAsync } from "../utils/commonFunctions.js";

export const getInterests = catchAsync(async (req, res, next) => {
  const getID = req.params.id;
  console.log('id: ', getID);
  if (!getID) {
    const interests = await Interest.find();
    return res.status(200).json({
      data: interests
    });
  }
  
export const deleteInterest(req, res, next) {
  if (!getID) {
    return res.status(400).json({ message: "Interest ID is required" });
  }
  
  const interest = await Interest.findByIdAndDelete(getID);
  if (!interest) {
    return res.status(404).json({ message: "Interest not found" });
  }
  
  res.status(200).json({
    message: "Interest deleted successfully",
    data: interest
  });
}


  const interests = await Interest.find({ _id: getID });
  if (!interests || interests.length === 0) {
    return res.status(404).json({ message: "No interests found" });
  }
  
  res.status(200).json({
    data: interests
  });
});



export const createInterest = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Interest name is required" });
  }
  // Create new interest
  const newInterest = await Interest.create({ name });

  res.status(201).json({
    message: "Interest created successfully",
    data: newInterest
  });
}); 

