import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest) {
       //Verificar se o email existe.
         const user = await prismaClient.user.findFirst({
              where: {
                email: email
              }
         });
         if (!user) {
             throw new Error("Email/Senha incorretos");
         }

         //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Senha incorretos");
        }


        //gerar um token JWT e devolver os dados do usuário com id, name e email

        
        
       return {ok: true}
    }
}

export { AuthUserService };