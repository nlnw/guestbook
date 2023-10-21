import { Database } from "@tableland/sdk";
import { useState } from "react";
import { useAccount } from "wagmi";
import { TABLELAND_TABLE, queryTableTop } from "./common";

export default function Form({ refresh }: { refresh: () => void }) {
  const { address, isConnected } = useAccount();
  const [message, setMessage] = useState<string>("");
  if (!isConnected) {
    return <></>;
  }

  const handleForm = async () => {
    const db = new Database();

    const { meta: insert } = await db
      .prepare(
        `INSERT INTO ${TABLELAND_TABLE} (sender, message) VALUES (?, ?);`
      )
      .bind(address, message)
      .run();

    await insert.txn?.wait();
    alert("Inserted!");
    refresh();
  };

  return (
    <div
      className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
      id="form"
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-gray-800 font-bold  dark:text-white">
            Post a message
          </h2>
        </div>

        <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleForm}>
            <div className="mb-4 sm:mb-8">
              <label
                htmlFor="hs-feedback-post-comment-name-1"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Sender
              </label>
              <input
                disabled
                type="text"
                id="hs-feedback-post-comment-name-1"
                className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                placeholder={address}
              />
            </div>

            <div className="mb-4 sm:mb-8">
              <label
                htmlFor="hs-feedback-post-comment-email-1"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Message
              </label>
              <input
                required
                id="hs-feedback-post-comment-email-1"
                className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="mt-6 grid">
              <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border  disabled:bg-slate-600 border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
