export interface SignUpData {
    name:string;
    email:string;
    password:string;
    rePassword:string;
    phone:string;
}

export interface SignUpSuccessResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export interface SignUpErrorResponse {
  message: string;
  status: string;
}
