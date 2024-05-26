import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    count: { type: Number, required:false,default:1},
    gender: { type: Number, required: true },
    lastLoginDate: { type: Date, required: false,default: Date.now },
    createdAt: { type: Date, required: false,default: Date.now },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    deletedAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
});

export default userSchema;
