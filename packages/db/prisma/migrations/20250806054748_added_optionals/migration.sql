-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;
