import prismaClient from "../../prisma";

class ListUserService {
    async execute() {
        const user = await prismaClient.user.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                profileImage: true,
                isAdmin: true,
            }
        });

        return user;
    }
}

export { ListUserService }