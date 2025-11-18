import { getPrisma } from "@/lib/db";

export async function GET() {
  const prisma = getPrisma();
  const users = await prisma.user.findMany();
  const value = { users };

  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
