// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config();

// const app = express();

// app.set("trust proxy", 1);

// // ====================== Middlewares ======================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ====================== CORS Configuration ======================
// const allowedOrigins = [
//   process.env.FRONTEND_LOCAL_URL || "http://localhost:5173",
//   process.env.FRONTEND_PRODUCTION_URL || "https://job-portal-alpha-puce.vercel.app",
//   /\.vercel\.app$/, // Allow all Vercel preview deployments
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin
//     if (!origin) return callback(null, true);
    
//     if (
//       allowedOrigins.some((allowed) => {
//         if (typeof allowed === "string") {
//           return origin === allowed;
//         } else if (allowed instanceof RegExp) {
//           return allowed.test(origin);
//         }
//         return false;
//       })
//     ) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); 

// // ====================== Security Headers ======================
// app.use((req, res, next) => {
//   res.header("X-Frame-Options", "DENY");
//   res.header("X-Content-Type-Options", "nosniff");
//   res.header("Referrer-Policy", "strict-origin-when-cross-origin");
//   next();
// });

// // ====================== Routes ======================
// app.get("/api/v1/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is healthy" });
// });

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// // ====================== Error Handling ======================
// app.use((err, req, res, next) => {
//   if (err.message === "Not allowed by CORS") {
//     res.status(403).json({ error: "Origin not allowed" });
//   } else {
//     console.error(err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ====================== Server Start ======================
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   connectDB(); // Initialize database connection
//   console.log(`Server running on port ${PORT}`);
// });

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

// ====================== Enhanced Debugging Middleware ======================
app.use((req, res, next) => {
  console.log('\n===== Incoming Request =====');
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Cookies:', req.cookies);
  console.log('Body:', req.body);
  next();
});

// ====================== CORS Configuration ======================
const allowedOrigins = [
  process.env.FRONTEND_LOCAL_URL || "http://localhost:5173",
  process.env.FRONTEND_PRODUCTION_URL || "https://job-portal-alpha-puce.vercel.app",
  /\.vercel\.app$/, // Allow all Vercel preview deployments
];

console.log('\n===== Allowed Origins =====');
console.log(allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    console.log('\n===== CORS Check =====');
    console.log('Incoming Origin:', origin);
    
    // Allow requests with no origin
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }
    
    const isAllowed = allowedOrigins.some((allowed) => {
      if (typeof allowed === "string") {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ====================== Response Debugging Middleware ======================
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(body) {
    console.log('\n===== Outgoing Response =====');
    console.log(`Status: ${res.statusCode}`);
    console.log('Headers:', res.getHeaders());
    if (res.getHeaders()['set-cookie']) {
      console.log('Cookies being set:', res.getHeaders()['set-cookie']);
    }
    console.log('Body:', body);
    originalSend.call(this, body);
  };
  next();
});

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
  console.error('\n===== ERROR =====');
  console.error(err.stack);
  
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Origin not allowed" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ====================== Server Start ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB(); // Initialize database connection
  console.log(`Server running on port ${PORT}`);
});


// app.listen(PORT, () => {
//   connectDB(); // Initialize database connection
//   console.log(`\n===== Server Started =====`);
//   console.log(`Server running on port ${PORT}`);
//   console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`Allowed Origins: ${allowedOrigins.join(', ')}`);
// });