//import { PrismaClient as erpPrismaClient, Prisma as dbPrisma, } from '@prisma/erp';
import { PrismaClient as tenantPrismaClient, Prisma as tenantPrisma, } from '@prisma/tenant';
import { exceptionModels } from './exceptionModels';

export class PrismaService {
  private getVersionExtension() {
    return {
      query: {
        $allModels: {
          async update({ model, args, query }: any) {
            if (!exceptionModels.includes(model)) {
              args.data = {
                ...args.data,
                version: { increment: 1 }
              };
            }
            return query(args);
          },
          async updateMany({ model, args, query }: any) {
            if (!exceptionModels.includes(model)) {
              args.data = {
                ...args.data,
                version: { increment: 1 }
              };
            }
            return query(args);
          },
        },
      },
    };
  }

  /*
  public createDbClient(
    dbUrl: string,
    dbOptions?: dbPrisma.PrismaClientOptions
  ): erpPrismaClient {
    const client = new erpPrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
      ...dbOptions,
      log: ['query', 'info', 'warn', 'error'],
    });

    client.$use(this.versionIncrementMiddleware as dbPrisma.Middleware);
    return client;
  }
  */

  public createTenantClient(
    tenantOptions?: tenantPrisma.PrismaClientOptions
  ): tenantPrismaClient {
    const client = new tenantPrismaClient({
      ...tenantOptions,
      log: ['info', 'warn', 'error'],
    });

    return client.$extends(this.getVersionExtension()) as tenantPrismaClient;
  }
}
