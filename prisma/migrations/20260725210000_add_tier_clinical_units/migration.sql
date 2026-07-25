-- CreateEnum
CREATE TYPE "DeviceTier" AS ENUM ('PREMIUM', 'HIGH_END', 'MID_RANGE', 'LOW_END');

-- CreateEnum
CREATE TYPE "ClinicalUnit" AS ENUM ('RADIOLOGY', 'OBGYN', 'CARDIOLOGY', 'PORTABLE');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "clinicalUnits" "ClinicalUnit"[],
ADD COLUMN     "competitors" JSONB,
ADD COLUMN     "tier" "DeviceTier";
