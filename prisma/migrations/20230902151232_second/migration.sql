/*
  Warnings:

  - The primary key for the `Followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Followers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tweet` table. All the data in the column will be lost.
  - The primary key for the `TweetLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `TweetLike` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `TweetLike` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Followers" (
    "userEmail" TEXT NOT NULL,
    "userFollows" TEXT NOT NULL,

    PRIMARY KEY ("userFollows", "userEmail"),
    CONSTRAINT "Followers_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Followers_userFollows_fkey" FOREIGN KEY ("userFollows") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Followers" ("userFollows") SELECT "userFollows" FROM "Followers";
DROP TABLE "Followers";
ALTER TABLE "new_Followers" RENAME TO "Followers";
CREATE TABLE "new_Tweet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Tweet_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("content", "created_at", "id", "updated_at") SELECT "content", "created_at", "id", "updated_at" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
CREATE TABLE "new_TweetLike" (
    "userEmail" TEXT NOT NULL,
    "TweetId" TEXT NOT NULL,
    "isLike" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userEmail", "TweetId"),
    CONSTRAINT "TweetLike_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TweetLike_TweetId_fkey" FOREIGN KEY ("TweetId") REFERENCES "Tweet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TweetLike" ("TweetId", "created_at", "isLike", "updated_at") SELECT "TweetId", "created_at", "isLike", "updated_at" FROM "TweetLike";
DROP TABLE "TweetLike";
ALTER TABLE "new_TweetLike" RENAME TO "TweetLike";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
