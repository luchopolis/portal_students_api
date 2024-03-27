/*
  Warnings:

  - A unique constraint covering the columns `[code_class]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_teachersId_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "removed" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_class_key" ON "courses"("code_class");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
