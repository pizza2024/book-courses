"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
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
    adminRole: String,
    email: String,
    phone: String,
    createdAt: Date
}, {
    collection: 'Admin',
    versionKey: false
});
const Admin = (0, mongoose_1.model)('Admin', adminSchema);
exports.default = Admin;
