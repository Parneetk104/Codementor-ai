import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Recreate __filename and __dirname because they are not available
// automatically inside ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load the .env file from the server directory.
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const ALLOWED_ENVIRONMENTS = [
  "development",
  "test",
  "production",
];

function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value.trim();
}

function parsePort(value) {
  const port = Number(value);

  if (
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error(
      "PORT must be an integer between 1 and 65535",
    );
  }

  return port;
}

function validateUrl(value, variableName) {
  try {
    const url = new URL(value);

    return url.origin;
  } catch {
    throw new Error(
      `${variableName} must be a valid URL`,
    );
  }
}

const nodeEnv =
  process.env.NODE_ENV?.trim() || "development";

if (!ALLOWED_ENVIRONMENTS.includes(nodeEnv)) {
  throw new Error(
    `NODE_ENV must be one of: ${ALLOWED_ENVIRONMENTS.join(", ")}`,
  );
}

const env = Object.freeze({
  port: parsePort(process.env.PORT || "5000"),

  clientUrl: validateUrl(
    process.env.CLIENT_URL ||
      "http://localhost:5173",
    "CLIENT_URL",
  ),

  geminiApiKey:
    requireEnvironmentVariable("GEMINI_API_KEY"),

  geminiModel:
    process.env.GEMINI_MODEL?.trim() ||
    "gemini-3.5-flash",

  nodeEnv,

  isDevelopment: nodeEnv === "development",
  isTest: nodeEnv === "test",
  isProduction: nodeEnv === "production",
});

export default env;