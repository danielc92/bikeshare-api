declare namespace Express {
  export interface Request {
    user?: {
      name: string;
      email: string;
      age?: number;
    };
  }
}
