"use server";
import { prisma } from "@/db";

export async function getHistory() {
  const rows = await prisma.history.findMany();

  return rows;
}
