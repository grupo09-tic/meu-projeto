import { PrismaClient as TenantPrismaClient } from '@prisma/tenant';
import { Prisma as TenantPrisma } from '@prisma/tenant';
import { PrismaService } from './prisma/services/prisma.service';

const prismaService = new PrismaService();
const tenantPrisma = prismaService.createTenantClient();
 
export { tenantPrisma, TenantPrisma, TenantPrismaClient };
