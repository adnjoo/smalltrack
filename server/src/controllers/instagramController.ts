import prisma from "../db";

const dummyData = {
  date: new Date(),
  description: "dummy",
};

export const getIGPosts = async (req: any, res: any) => {
  try {
    const posts = await prisma.instagramPost.findMany();
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
};

export const upsertIGPost = async (req: any, res: any) => {
  try {
    const post = await prisma.instagramPost.create({
      data: {
        ...dummyData,
      },
    });

    res.json({ post });
  } catch (error) {
    console.log(error);
  }
};
