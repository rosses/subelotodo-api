import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FaqCategories = prisma.faqsCategories;

export default  FaqCategories;