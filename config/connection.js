import mongoose from "mongoose";
const connection = async () => {
  try {
    await mongoose.connect(process.env.ALTAS_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true
    })
    console.log('mongodb connected')
    const company = mongoose.connection.db.collection('companies')
    const user = mongoose.connection.db.collection('users')
    try{
       await company.createIndex({ name: 1 }, { unique: true },(err, result) => {
      console.log('index created on company name',result)
       })
       await user.createIndex({ role: 1 },(err, result) => {
      console.log('index created on company name',result)
       })

    }
    catch(err){
      console.log('index already exists',err)
    }
  } catch (err) {
    console.log('failed to connect')
    process.exit()
  }
}
export default connection
