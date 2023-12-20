import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Order = prisma.orders;

export default  Order;