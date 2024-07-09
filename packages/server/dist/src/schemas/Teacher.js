"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TeacherSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    nickname: String,
    teacherRole: String,
    email: String,
    phone: String,
    createdAt: Date
}, {
    collection: 'Teacher',
    versionKey: false
});
const Teacher = (0, mongoose_1.model)('Teacher', TeacherSchema);
exports.default = Teacher;
