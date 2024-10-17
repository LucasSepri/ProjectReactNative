import { User } from '@prisma/client'; // Ajuste o import de acordo com o local do seu modelo User

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}
