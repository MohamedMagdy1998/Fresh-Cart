export interface SignInData {
  email: string;
  password: string;
}

export interface SignInSuccessResponse 
{
    message: string;
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
}

export interface SignInErrorResponse {
    message: string;
    status: string;
}