"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PublishedCourseSchema = new mongoose_1.Schema({
    location: String,
    startTime: Date,
    endTime: Date,
    createdAt: Date,
    teacher: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Teacher'
    },
    course: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Course'
    },
    admin: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    collection: 'PublishedCourse',
    versionKey: false
});
const PublishedCourse = (0, mongoose_1.model)('PublishedCourse', PublishedCourseSchema);
exports.default = PublishedCourse;
