import { prismaClient } from "./../config/db.config";
import { Roles } from "./../constants/role.enum";
import { JWT } from "./../utils/jwt.util";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "interfaces/auth.interface";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = JWT.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function authorizeRoleMiddleware(requiredRole: Roles) {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await prismaClient.users.findUnique({
      where: { id: req.userId },
      select: { role: true },
    });

    if (user?.role !== requiredRole) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    next();
  };
}
