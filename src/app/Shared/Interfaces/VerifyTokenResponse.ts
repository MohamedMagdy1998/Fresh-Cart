export interface VerifyTokenSuccessResponse {
     id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface VerifyTokenErrorResponse {
    message: string;
    statusMsg: string;
}

