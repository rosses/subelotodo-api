// src/models/User.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.users;

export default  User;
