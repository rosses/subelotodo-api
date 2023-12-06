import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ShoppingCart = prisma.shoppingCart;

export default  ShoppingCart;