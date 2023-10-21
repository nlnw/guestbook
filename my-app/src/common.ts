import { Database } from "@tableland/sdk";

export const TABLELAND_TABLE = "guestbook_80001_8065";

export type TableRow = {
  id: number;
  sender: string;
  message: string;
  encrypted_receiver: string | null;
  encrypted_message: string | null;
};

export async function queryTable(): Promise<TableRow[]> {
  const db = new Database();
  const { results } = await db
    .prepare(`SELECT * FROM ${TABLELAND_TABLE} ORDER BY id DESC;`)
    .all();
  return results as TableRow[];
}

export async function queryTableTop(): Promise<TableRow> {
  const db = new Database();
  const result = await db
    .prepare(`SELECT * FROM ${TABLELAND_TABLE} ORDER BY id DESC;`)
    .first();
  return result as TableRow;
}
