import prismaClient from "../../prisma";

interface UserRequest {
    userId: string;
    isAdmin: boolean;
}

class UpdateCargoUserService {
    async execute({ userId, isAdmin }: UserRequest) {

        const updatedUser = await prismaClient.user.update({
            where: { id: userId }, // Change 'userId' to 'id'
            data: { isAdmin },
            select: {
                id: true,
                isAdmin: true
            }
        });

        return updatedUser;
    }
}

export { UpdateCargoUserService };

