import { prismaClient } from "./../config/db.config";
import { Roles } from "./../constants/role.enum";
import {
  ForgotPasswordDto,
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  ResetPasswordDto,
} from "./../dto/auth.dto";
import { UserResponseDto } from "./../dto/user.dto";
import { normalizeGmail } from "./../utils/helper.util";
import { JWT } from "./../utils/jwt.util";
import { Password } from "./../utils/password.util";
import { ResponseError } from "./../utils/response.util";
import { AuthSchema } from "./../validation/auth.schema";
import { Validation } from "./../validation/validation";

export class AuthService {
  // Registering a user
  static async register(request: RegisterDto): Promise<UserResponseDto> {
    const registerRequest: RegisterDto = Validation.validate(
      AuthSchema.REGISTER,
      request
    );

    // normalize the email
    registerRequest.email = normalizeGmail(registerRequest.email);

    // check if the user already exists
    const existingUser = await prismaClient.users.findUnique({
      where: {
        email: registerRequest.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ResponseError("error", 400, "User with this email already exists");
    }

    // hash the password
    registerRequest.password = await Password.hashPassword(
      registerRequest.password
    );

    // register the user
    const newUser = await prismaClient.users.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: registerRequest.password,
        role: Roles.USER,
      },
    });

    return {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  // Login a user
  static async login(request: LoginDto): Promise<LoginResponseDto> {
    const loginRequest: LoginDto = Validation.validate(
      AuthSchema.LOGIN,
      request
    );

    const registeredUser = await prismaClient.users.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!registeredUser) {
      throw new ResponseError("error", 401, "Invalid email or password");
    }

    // password check
    const isPasswordMatched = await Password.comparePasswords(
      loginRequest.password,
      registeredUser.password
    );

    if (!isPasswordMatched) {
      throw new ResponseError("error", 401, "Invalid email or password");
    }

    const token = JWT.generateToken(registeredUser.id);

    return {
      token: token,
      user: {
        name: registeredUser.name,
        email: registeredUser.email,
        photo: registeredUser.photo ?? "",
        role: registeredUser.role,
      },
    };
  }

  /**
   * Cek apakah email pengguna ada di database.
   * @param request - DTO yang hanya berisi email
   * @returns Mengembalikan email jika ditemukan
   */
  static async checkEmail(request: ForgotPasswordDto): Promise<{ email: string }> {
    const { email } = Validation.validate(AuthSchema.FORGOT_PASSWORD, request);

    const user = await prismaClient.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ResponseError("error", 404, "Email not found in our records");
    }

    return { email: user.email };
  }

  /**
   * Mereset password pengguna berdasarkan email.
   * @param request - DTO yang berisi email dan password baru
   */
  static async resetPassword(request: ResetPasswordDto): Promise<void> {
    const { email, password } = Validation.validate(
      AuthSchema.RESET_PASSWORD,
      request
    );

    // Verifikasi sekali lagi bahwa pengguna benar-benar ada
    const user = await prismaClient.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ResponseError("error", 404, "User not found");
    }

    // Hash password baru
    const hashedPassword = await Password.hashPassword(password);

    // Update password di database
    await prismaClient.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}