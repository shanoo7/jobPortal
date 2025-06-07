
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

// Required when behind a proxy (e.g., Render) for secure cookies to work
app.set("trust proxy", 1);

// ========== MIDDLEWARES ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ========== CORS CONFIG ==========
const allowedOrigins = [
  process.env.FRONTEND_LOCAL_URL,
  process.env.FRONTEND_PRODUCTION_URL,
  /\.vercel\.app$/, // Allow all Vercel preview deployments
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((allowed) => {
      if (typeof allowed === "string") return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ========== SECURITY HEADERS ==========
app.use((req, res, next) => {
  res.header("X-Frame-Options", "DENY");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ========== ROUTES ==========
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed by CORS" });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Allowed Origins:`, allowedOrigins);
});
