import mongoose from "mongoose";
const connection = async () => {
  try {
    await mongoose.connect(process.env.ALTAS_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true
    })
    console.log('mongodb connected')
  } catch (err) {
    console.log('failed to connect')
    process.exit()
  }
}
export default connection
