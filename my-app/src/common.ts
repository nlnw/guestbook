export const TABLELAND_TABLE = "guestbook_80001_8065";

export type TableRow = {
  id: number;
  sender: string;
  message: string;
  encrypted_receiver: string | null;
  encrypted_message: string | null;
};
