// src/models/Subcategory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Subcategory = prisma.subcategories;

export default Subcategory;
