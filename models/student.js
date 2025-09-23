import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        min: 0
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
