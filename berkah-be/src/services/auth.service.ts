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
import { Mailer } from "./../utils/mailer.util";
import { Password } from "./../utils/password.util";
import { ResponseError } from "./../utils/response.util";
import { AuthSchema } from "./../validation/auth.schema";
import { Validation } from "./../validation/validation";
import crypto from "crypto";

export class AuthService {
  // Registering a user
  static async register(request: RegisterDto): Promise<UserResponseDto> {
    const registerRequest: RegisterDto = Validation.validate(
      AuthSchema.REGISTER,
      request
    );

    // normalize the email
    request.email = normalizeGmail(request.email);

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
      throw new ResponseError("error", 400, "User already exists");
    }

    // hash the password
    registerRequest.password = await Password.hashPassword(
      registerRequest.password
    );

    // register the user
    const registerUser = await prismaClient.users.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: registerRequest.password,
        role: Roles.USER,
      },
    });

    return {
      name: registerUser.name,
      email: registerUser.email,
      role: registerUser.role,
    };
  }

  // Login
  static async login(
    request: LoginDto,
    path: string
  ): Promise<LoginResponseDto> {
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
      throw new ResponseError("error", 400, "Invalid email or password");
    }

    // password check
    const isPasswordMatched = await Password.comparePasswords(
      loginRequest.password,
      registeredUser.password
    );

    if (!isPasswordMatched) {
      throw new ResponseError("error", 400, "Invalid email or password");
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

  // Forgot Password
  static async forgotPassword(request: ForgotPasswordDto): Promise<void> {
    const forgotPasswordRequest: ForgotPasswordDto = Validation.validate(
      AuthSchema.FORGOT_PASSWORD,
      request
    );
    const user = await prismaClient.users.findUnique({
      where: {
        email: forgotPasswordRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError("error", 400, "User not found");
    }

    const token = crypto.randomBytes(8).toString("hex");

    const hashedToken = await Password.hashPassword(token);

    await prismaClient.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedToken,
      },
    });

    await Mailer.sendPasswordResetEmail(user.email, user.name, token);

    return;
  }
}
