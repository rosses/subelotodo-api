import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Tag = prisma.tags;

export default  Tag;