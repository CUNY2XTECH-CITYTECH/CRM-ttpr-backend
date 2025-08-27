import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const Industry = mongoose.model('Industry', industrySchema);

export default Industry;
