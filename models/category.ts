// src/models/Category.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Category = prisma.categories;

export default  Category;