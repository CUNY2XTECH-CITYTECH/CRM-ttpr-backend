import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: String
    }
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
