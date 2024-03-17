import { Request, Response } from "express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import type { ToDo } from "@prisma/client";

import prisma from "../db";

export const getToDos = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<ToDo[] | void> => {
  try {
    const todos = await prisma.toDo.findMany({
      where: {
        clerkUserId: req.auth.userId as string,
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
    let user;
    let toDo;

    user = await prisma.clerkUser.findUnique({
      where: { id: req.auth.userId as string },
    });

    if (!user) {
      user = await prisma.clerkUser.create({
        data: { id: req.auth.userId as string },
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
          clerkUserId: req.auth.userId as string,
        },
      });
    }

    res.json({ toDo });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal server error ${error}`);
  }
};

export const deleteToDo = async (
  req: WithAuthProp<Request>,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const toDo = await prisma.toDo.findUnique({
      where: {
        id,
      },
    });

    if (!toDo) {
      res.status(404).send("ToDo item not found");
      return;
    }

    if (toDo.clerkUserId !== req.auth.userId) {
      res.status(403).send("Unauthorized");
      return;
    }

    await prisma.toDo.delete({
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
