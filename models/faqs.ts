import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Faq = prisma.faqs;

export default  Faq;