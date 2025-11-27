import { posts } from "../index";
import { db } from "../index";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (_req: NextRequest, { params }) => {
  const { id } = await params;
  const data = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));
  return Response.json(data);
};