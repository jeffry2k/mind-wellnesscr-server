export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = `mongodb+srv://${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority` || "mongodb://127.0.0.1/mindwellness_db";
// export const MONGODB_URI = "mongodb+srv://vercel-admin-user:Jnjmjrnmmfuc1@cluster0.vcq4nv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// export const MONGODB_URI = `mongodb+srv://${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority` || "mongodb://127.0.0.1/mindwellness_db";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "mindwellnesstoken";
export const FRONTEND_URL = process.env.FRONTEND_URL || "https://mind-wellnesscr-app-jeffry2k.vercel.app";