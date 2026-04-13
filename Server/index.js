import "./bootstrap.js"
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./app/config/database.js";
import router from "./app/routes/routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

/* =========================
   MIDDLEWARE (CORRECT ORDER)
========================= */

// 1. Enable CORS FIRST (before routes)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        methods: process.env.CORS_METHODS || "GET,POST,PUT,DELETE",
        credentials: process.env.CORS_CREDENTIALS === "true",
    })
);

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Static files
app.use(express.static("public"));

app.use((req, res, next) => {
    const start = Date.now();

    // Capture original send
    const originalSend = res.send;

    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;

        console.log("====================================");
        console.log(`${req.method} ${req.originalUrl}`);
        console.log("Headers:", req.headers);
        console.log("Request Body:", req.body);

        console.log("Status:", res.statusCode);
        console.log("Response Body:", responseBody);
        console.log(`Time: ${duration}ms`);
        console.log("====================================\n");
    });

    next();
});


app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ message: "Internal Server Error" });
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// API routes
app.use("/api", router);

/* =========================
   DATABASE + SERVER START
========================= */

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();