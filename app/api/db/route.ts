import { getDb } from "../../../lib/drizzle";

export async function GET() {
  const db = getDb();
  const users = await db.query.usersTable.findMany();
  const value = { users };

  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
