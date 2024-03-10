-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClerkUser" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ClerkUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
