import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// ====================== Middlewares ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ====================== CORS Configuration ======================
const allowedOrigins = [
  process.env.FRONTEND_LOCAL_URL || "http://localhost:5173",
  process.env.FRONTEND_PRODUCTION_URL || "https://your-frontend.vercel.app",
  /\.vercel\.app$/, // Allow all Vercel preview deployments
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    if (
      allowedOrigins.some((allowed) => {
        if (typeof allowed === "string") {
          return origin === allowed;
        } else if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return false;
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

// ====================== Security Headers ======================
app.use((req, res, next) => {
  res.header("X-Frame-Options", "DENY");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ====================== Routes ======================
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ====================== Error Handling ======================
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Origin not allowed" });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ====================== Server Start ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB(); // Initialize database connection
  console.log(`Server running on port ${PORT}`);
});
