import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const LoginSchema = new mongoose.Schema({

  email: {
    type: String, required: true,
    validate: {
      validator: function(val) {
        return emailRegex.test(val)
      },
      message: props => `${props.value} is not a valid email`
    }

  },
  is_first_login: {
    type: Boolean, default: true
  }
  ,
  refresh_token: {
    type: String, required: true
  },
  user_id: {
    type: String, required: true
  },
  created_at: {
    type: BigInt, required: true
  }
  ,
  expired_at: {
    type: BigInt, required: true
  }

})

export default mongoose.model('LoginCredentials', LoginSchema)
