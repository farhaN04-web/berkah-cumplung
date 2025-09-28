export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
};

export type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    photo: string;
    role: string;
  };
};

export type RegisterResponse = {
  name: string;
  email: string;
  role: string;
};

export type ForgotPasswordDTO = {
  email: string;
};

export type ResetPasswordDTO = {
  email: string;
  password:  string;
  confirmationPassword:  string;
}