import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const State = prisma.states;

export default  State;