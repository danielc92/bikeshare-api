declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}
