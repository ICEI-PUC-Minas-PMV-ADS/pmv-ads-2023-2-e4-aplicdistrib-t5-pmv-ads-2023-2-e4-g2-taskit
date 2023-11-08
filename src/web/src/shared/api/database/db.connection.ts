import { PrismaClient } from '@prisma/client'

class DBConnection {
  private static instance: DBConnection;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): DBConnection {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    return DBConnection.instance;
  }

  public db(): PrismaClient {
    return this.prisma;
  }
}

export const db = DBConnection.getInstance().db();
