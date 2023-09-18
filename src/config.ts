export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = `mongodb+srv://${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority` || "mongodb+srv://jeffry2k:Jnjmjrnmm1@cluster0.hsbmisp.mongodb.net/mindwellness_db?retryWrites=true&w=majority";
// export const MONGODB_URI = "mongodb+srv://vercel-admin-user:Jnjmjrnmmfuc1@cluster0.vcq4nv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "mindwellnesstoken";
export const FRONTEND_URL = process.env.FRONTEND_URL || "https://mindwellnesscr-app.vercel.app";