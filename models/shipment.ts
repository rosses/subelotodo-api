import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Shipment = prisma.shipments;

export default  Shipment;