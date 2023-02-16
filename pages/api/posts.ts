// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/prisma";
import { Posts } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.posts.findMany();
    res.status(200).json([...data]);
  }
  if (req.method === "POST") {
    res.status(405).json({ status: "method not allowed" });
  }
}
