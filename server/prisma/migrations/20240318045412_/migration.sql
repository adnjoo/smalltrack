-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "project" TEXT,
    "clerkUserId" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClerkUser" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ClerkUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
