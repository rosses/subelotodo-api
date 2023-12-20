import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Notification = prisma.notifications;

export default  Notification;