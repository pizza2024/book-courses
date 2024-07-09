"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudentSchema = new mongoose_1.Schema({
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
    StudentRole: String,
    email: String,
    phone: String,
    createdAt: Date
}, {
    collection: 'Student',
    versionKey: false
});
const Student = (0, mongoose_1.model)('Student', StudentSchema);
exports.default = Student;
