export type Tokens = {
  accessToken?: string;
  refreshToken?: string;
  emailToken?: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};
