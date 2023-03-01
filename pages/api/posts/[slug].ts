import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const data = await prisma.post.findFirst({
    where: {
      slug: String(slug),
    },
  });

  if (!data) {
    return res.status(400).json({ message: "post tidak ditemukan" });
  }

  res.status(200).json({ data });
}
