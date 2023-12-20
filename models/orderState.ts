import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OrderStates = prisma.orderStates;

export default  OrderStates;