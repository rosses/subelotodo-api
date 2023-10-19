import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductImage = prisma.productImages;

export default  ProductImage;