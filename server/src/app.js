import express from "express";
import cors from "cors";
import env from "./config/env.js";
import aiRoutes from "./routes/aiRoutes.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Allow requests from the frontend.
app.use(cors());

// Parse incoming JSON request bodies.
//app.use(express.json());
app.use(express.json({ limit: "20kb" }));
// Simple backend health check.

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeMentor API is running",
    environment: env.nodeEnv,
  });
});

// Mount AI routes.
app.use("/api/ai", aiRoutes);

// Handle unknown endpoints.
app.use(notFoundHandler);

// Handle unexpected application errors.
app.use(errorHandler);

export default app;