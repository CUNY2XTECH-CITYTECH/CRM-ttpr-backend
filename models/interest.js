import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
     name: {
         type: Array,
         required: true,
         minLength: 3,
         maxLength: 50,
         unique: true,
         trim: true
     },

     id: { 
         type: String,
         required: true,
         validate: {
             validator: function(val) {
                 return !isNaN(val) && val.length === 8;
             },
             message: 'id must be number and must have 8 digits'
         }
     }
})



const Interest = mongoose.model('Interest', interestSchema);
export default Interest;