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
  
  const interests = await Interest.find({ _id: getID });
  if (!interests || interests.length === 0) {
    return res.status(404).json({ message: "No interests found" });
  }
  
  res.status(200).json({
    data: interests
  });
}); 

