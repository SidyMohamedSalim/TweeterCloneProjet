-- CreateTable
CREATE TABLE "Replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "TweetId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Replies_TweetId_fkey" FOREIGN KEY ("TweetId") REFERENCES "Tweet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
