// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/prisma";
import convertToSlug from "@/src/utils/makeSlug/convertToSlug";
import {
  PrismaClientKnownRequestError
} from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });
    res.status(200).json([...data]);
  }

  if (req.method === "POST") {
    if (!req.body.title || !req.body.body)
      return res.status(400).json({ message: "Bad Request" });

    const post = await prisma.post
      .create({
        data: {
          author: req.body.author,
          title: req.body.title,
          slug: convertToSlug(req.body.title),
          body: req.body.body,
        },
      })
      .catch((error: PrismaClientKnownRequestError) => {
        console.log({ error });
        if (error.code == "P2002" && error.meta?.target == "Post_slug_key") {
          return res.status(400).json({ message: "slug telah terpakai" });
        }
      });
    console.log({ post });
    res.status(200).json([{ status: "success" }, post]);
  }
}
