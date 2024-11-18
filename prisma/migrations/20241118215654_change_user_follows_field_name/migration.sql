/*
  Warnings:

  - The primary key for the `user_follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followedById` on the `user_follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `user_follows` table. All the data in the column will be lost.
  - Added the required column `followed_by_id` to the `user_follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `user_follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_followedById_fkey";

-- DropForeignKey
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_followingId_fkey";

-- AlterTable
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_pkey",
DROP COLUMN "followedById",
DROP COLUMN "followingId",
ADD COLUMN     "followed_by_id" UUID NOT NULL,
ADD COLUMN     "following_id" UUID NOT NULL,
ADD CONSTRAINT "user_follows_pkey" PRIMARY KEY ("following_id", "followed_by_id");

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_followed_by_id_fkey" FOREIGN KEY ("followed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
