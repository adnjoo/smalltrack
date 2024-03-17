import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import type { Link } from "@prisma/client";

import prisma from "../db";

export const getLinks = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Link[] | void> => {
  try {
    const links = await prisma.link.findMany({
      where: {
        clerkUserId: req.auth.userId as string,
      },
    });

    res.json(links);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};

export const upsertLink = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<Link | void> => {
  try {
    let user;
    let dbLink;

    user = await prisma.clerkUser.findUnique({
      where: { id: req.auth.userId as string },
    });

    if (!user) {
      user = await prisma.clerkUser.create({
        data: { id: req.auth.userId as string },
      });
    }

    const { id, description, link, date } = req.body;

    if (id) {
      dbLink = await prisma.link.update({
        where: {
          id,
        },
        data: {
          date,
          description,
          link,
        },
      });
    } else {
      dbLink = await prisma.link.create({
        data: {
          date: new Date(),
          description,
          link,
          clerkUserId: req.auth.userId as string,
        },
      });
    }

    res.json({ dbLink });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};

export const deleteLink = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const dbLink = await prisma.link.findUnique({
      where: {
        id,
      },
    });

    if (!dbLink) {
      res.status(404).send("ToDo item not found");
      return;
    }

    if (dbLink.clerkUserId !== req.auth.userId) {
      res.status(403).send("Unauthorized");
      return;
    }

    await prisma.link.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};
