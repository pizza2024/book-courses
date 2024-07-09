"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Admin'
    },
    createdAt: Date
}, {
    collection: 'Course',
    versionKey: false
});
const Course = (0, mongoose_1.model)('Course', CourseSchema);
exports.default = Course;
