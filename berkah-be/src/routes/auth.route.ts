import { Router } from "express";
import { AuthController } from "./../controllers/auth.controller";

// Menggunakan class-based router untuk konsistensi
class AuthRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Rute untuk registrasi pengguna baru
    this.router.post("/register", AuthController.register);

    // Rute untuk login pengguna
    this.router.post("/login", AuthController.login);

    // Rute untuk memeriksa email (langkah pertama Lupa Password)
    this.router.post("/check-email", AuthController.checkEmail);

    // Rute untuk mereset password (langkah kedua Lupa Password)
    this.router.post("/reset-password", AuthController.resetPassword);
  }
}

// Ekspor instance dari router agar bisa digunakan di app.ts
export const authRouter = new AuthRoute().router;