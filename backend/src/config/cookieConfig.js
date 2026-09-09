import env from "./env.js";

const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const parseDurationToMs = (duration) => {
  if (typeof duration !== "string") {
    return DEFAULT_MAX_AGE_MS;
  }

  const match = /^(\d+)([smhd])$/.exec(duration.trim());

  if (!match) {
    return DEFAULT_MAX_AGE_MS;
  }

  const value = Number(match[1]);
  const unit = match[2];

  const unitToMs = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * unitToMs[unit];
};

export const AUTH_COOKIE_NAME = "admin_token";

export const getAuthCookieOptions = () => {
  const isProduction = env.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: parseDurationToMs(env.jwtExpiresIn),
  };
};

export const getClearCookieOptions = () => {
  const isProduction = env.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
};