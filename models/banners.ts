import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Banner = prisma.banners;

export default  Banner;