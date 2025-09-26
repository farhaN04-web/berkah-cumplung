import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user/index.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger.util";
import { moderateLimiter } from "./utils/limiter.util";
import webroute from "./routes/web/index.route";
import adminRoute from "./routes/admin/admin.route";
import productRoute from "./routes/admin/product.route";
import transactionRoute from "./routes/admin/transaction.route";
import customerRoute from "./routes/admin/customer.route";
import dashboardRoute from "./routes/admin/dashboard.route";
import categoryRoute from "./routes/admin/category.route";

dotenv.config();

const app = express();

// Configure CORS properly to handle OPTIONS requests
app.use(
  cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Apply rate limiting after CORS to avoid blocking preflight requests
app.use(moderateLimiter);

app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow cross-origin requests
  })
);

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.get("/", (req, res) => {
  res.json({
    name: "Broderie Backend API",
    version: "1.0.0",
  });
});

// web routes
app.use("/v1/", authRoute);
app.use("/v1/", webroute);

// user routes
app.use("/v1/", userRoute);

// admin routes
app.use("/v1/", adminRoute);
app.use("/v1/", productRoute);
app.use("/v1/", categoryRoute);
app.use("/v1/", transactionRoute);
app.use("/v1/", customerRoute);
app.use("/v1/", dashboardRoute);

app.use("/storage", express.static("storage"));
app.use(errorMiddleware);

// Running Swagger Docs in all environments
import("swagger-ui-express").then(({ default: swaggerUi }) => {
  import("./config/swagger.config").then(({ swaggerSpec }) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs enabled at http://127.0.0.1:${PORT}/api-docs`);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Available endpoints:");
  console.log("====================================");
  listEndpoints(app).forEach((route) => {
    console.log(`${route.methods} ${route.path}`);
  });
  console.log("====================================");
});
