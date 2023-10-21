import Jazzicon from "react-jazzicon";
import { TableRow } from "./common";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function TableControls() {
  const { address, isConnected } = useAccount();

  return (
    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
      <div></div>

      <div>
        <div className="inline-flex gap-x-2">
          {isConnected && (
            <a
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              href="#form"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Post
            </a>
          )}
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            href="#"
          >
            <ConnectButton
              label="Connect"
              accountStatus="avatar"
              chainStatus="icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              ID
            </span>
          </div>
        </th>

        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              Sender
            </span>
          </div>
        </th>

        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              Message
            </span>
          </div>
        </th>

        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              Enc. Receiver
            </span>
          </div>
        </th>

        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center gap-x-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
              Enc. Message
            </span>
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default function Table({ messages }: { messages: TableRow[] }) {
  const { address, isConnected } = useAccount();
  return (
    <>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 l mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <TableControls />
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHead />
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {messages.map((message) => (
                      <tr key={message.id}>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {message.id}
                            </span>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-2">
                              <Jazzicon
                                diameter={24}
                                seed={parseInt(message.sender, 16)}
                              />
                              <div className="grow">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  <a
                                    href={`https://mumbai.polygonscan.com/address/${message.sender}`}
                                    target="_blank"
                                  >
                                    {message.sender.substring(0, 6)}...
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-2">
                              <div className="grow">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {message.message}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-2">
                              <div className="grow">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {message.encrypted_receiver}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-2">
                              <div className="grow">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {message.encrypted_message}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {messages.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        Next
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
