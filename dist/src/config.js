"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.TOKEN_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = `mongodb+srv://${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority` || "mongodb://127.0.0.1/mindwellness_db";
// export const MONGODB_URI = "mongodb+srv://vercel-admin-user:Jnjmjrnmmfuc1@cluster0.vcq4nv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// export const MONGODB_URI = `mongodb+srv://${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority` || "mongodb://127.0.0.1/mindwellness_db";
exports.TOKEN_SECRET = process.env.TOKEN_SECRET || "mindwellnesstoken";
exports.FRONTEND_URL = process.env.FRONTEND_URL || "https://mind-wellnesscr-app-jeffry2k.vercel.app";
