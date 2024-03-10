import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import type { ToDo } from "@prisma/client";
import prisma from "../db";

export const getToDos = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<ToDo[] | void> => {
  try {
    if (!req.auth.userId) {
      throw new Error("Unauthorized: no user ID provided");
    }

    const todos = await prisma.toDo.findMany({
      where: {
        clerkUserId: req.auth.userId,
      },

    });

    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};

export const upsertToDo = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<ToDo | void> => {
  try {
    if (!req.auth.userId) {
      throw new Error("Unauthorized: no user ID provided");
    }

    let user;
    let toDo;

    user = await prisma.clerkUser.findUnique({
      where: { id: req.auth.userId },
    });

    if (!user) {
      user = await prisma.clerkUser.create({
        data: { id: req.auth.userId },
      });
    }

    const { id, description, done, date } = req.body;

    if (id) {
      toDo = await prisma.toDo.update({
        where: {
          id,
        },
        data: {
          date,
          description,
          done,
        },
      });
      res.json({ toDo });
    } else {
      toDo = await prisma.toDo.create({
        data: {
          date: new Date(),
          description,
          done,
          clerkUserId: req.auth.userId,
        },
      });
    }

    res.json({ toDo });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};
