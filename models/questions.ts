import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Question = prisma.questions;

export default  Question;