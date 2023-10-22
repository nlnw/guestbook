import { Database } from "@tableland/sdk";
import { Chain, createPublicClient, getContract, http } from "viem";
import { scrollSepolia } from "viem/chains";
import { GUESTBOOK_ABI } from "./commonAbi";

export const TABLELAND_TABLE = "guestbook_80001_8065";
export const SCROLL_GUESTBOOK_ADDRESS =
  "0xf98CBd9bDc0dd1441DA3faE0E1Eb66D6F966e52d";
export const MANTLE_GUESTBOOK_ADDRESS =
  "0xf98CBd9bDc0dd1441DA3faE0E1Eb66D6F966e52d";

export type TableRow = {
  id: number;
  sender: string;
  message: string;
  encrypted_receiver: string | null;
  encrypted_message: string | null;
};

export type TableRowWithChain = TableRow & {
  chain: string;
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

export async function writeTableMessage(address: string, message: string) {
  const db = new Database();

  const { meta: insert } = await db
    .prepare(`INSERT INTO ${TABLELAND_TABLE} (sender, message) VALUES (?, ?);`)
    .bind(address, message)
    .run();

  await insert.txn?.wait();
}

export async function queryEVMTestnetMessages(
  address: string,
  chain: Chain
): Promise<TableRowWithChain[]> {
  const publicClient = createPublicClient({
    batch: { multicall: true },
    chain: chain,
    transport: http(),
  });
  const contract = getContract({
    address: SCROLL_GUESTBOOK_ADDRESS,
    abi: GUESTBOOK_ABI,
    publicClient,
  });

  const numPosts = (await contract.read.count()) as number;
  const posts: TableRowWithChain[] = [];
  for (let i = 0; i < numPosts; i++) {
    const post = (await contract.read.posts([BigInt(i)])) as [
      string,
      string,
      string,
      string
    ];
    posts.push({
      id: i,
      chain: chain.name,
      sender: post[0],
      message: post[1],
      encrypted_receiver:
        post[2] === "0x0000000000000000000000000000000000000000" ? "" : post[2],
      encrypted_message: post[3],
    });
  }
  return posts;
}
