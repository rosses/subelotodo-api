import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserType = prisma.userTypes;

export default  UserType;