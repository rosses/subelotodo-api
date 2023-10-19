import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Product = prisma.products;

export default  Product;