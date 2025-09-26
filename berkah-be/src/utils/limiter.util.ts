import rateLimit from "express-rate-limit";

export const strictLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 120,
	message: "Too many request",
	standardHeaders: true,
	legacyHeaders: false,
	skip: (req) => req.method === "OPTIONS",
});

export const moderateLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 120,
	message: "Too many request",
	standardHeaders: true,
	legacyHeaders: false,
	skip: (req) => req.method === "OPTIONS",
});
