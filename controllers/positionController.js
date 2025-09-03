import {catchAsync} from "../utils/commonFunctions.js";
import Position from "../models/Position.js";
import mongoose from "mongoose";

export const createPosition = catchAsync(async (req, res, next) => {
    const exist = await Position.find({
        title: req.body.title
    });
    console.log(req.body, 'body');
    if (exist.length === 0) {
        const position = await Position.create(req.body);
        console.log('created position', position);
        res.status(200).json({
            positions: position
        });
    } else {
        res.status(201).json({
            message: `Position already exists with title ${req.body.title}`,
            existingPosition: exist[0]
        });
    }
});
export const getPosition = catchAsync(async (req, res, next) => {
    const positions = await Position.find();
    res.status(200).json({
        positions: positions
    });
});

