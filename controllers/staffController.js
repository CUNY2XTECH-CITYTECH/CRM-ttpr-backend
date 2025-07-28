// logic for fetching and posting
import Staff from "../models/Staff.js";

export const createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body)
    res.status(200).json(staff)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
export const getStaff = async () => {
  const staff = await Staff.find()
  res.json(staff)
}
