import dotenv from "dotenv";

dotenv.config();

const requiredInProduction = ["MONGODB_URI", "CORS_ORIGIN", "JWT_SECRET"];

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || "",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  aiApiKey: process.env.AI_API_KEY || "",
  aiApiProvider: process.env.AI_API_PROVIDER || "",
  jwtIssuer: process.env.JWT_ISSUER || "portfolio-api",
  jwtAudience: process.env.JWT_AUDIENCE || "portfolio-admin",
};

if (env.nodeEnv === "production") {
  const mapped = {
    MONGODB_URI: env.mongodbUri,
    CORS_ORIGIN: env.corsOrigin,
    JWT_SECRET: env.jwtSecret,
  };

  const missing = requiredInProduction.filter((key) => !mapped[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${missing.join(", ")}`
    );
  }

  if (env.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production.");
  }
}

export default env;