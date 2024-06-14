import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                profileImage: true
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return { user };
    }
}

export { DetailUserService };
