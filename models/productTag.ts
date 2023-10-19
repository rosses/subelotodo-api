import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductTag = prisma.productTags;

export default  ProductTag;