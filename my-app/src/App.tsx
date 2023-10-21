import tablelandLogo from "./assets/tableland.svg";
import "./App.css";
import Table from "./Table";
import { Database } from "@tableland/sdk";
import { useEffect, useState } from "react";
import { TABLELAND_TABLE, TableRow } from "./common";

function App() {
  const [messages, setMessages] = useState<TableRow[]>([]);

  useEffect(() => {
    const dbRead = new Database();
    const fetchData = async () => {
      const { results } = await dbRead
        .prepare(`SELECT * FROM ${TABLELAND_TABLE};`)
        .all();
      setMessages(results as TableRow[]);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-3xl leading-tight font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-700 text-transparent">
          X-Chain Guestbook
        </h2>
        <p className="mt-2 lg:text-lg text-gray-800 dark:text-gray-200">
          Built with{" "}
          <img
            style={{ display: "inline-block" }}
            alt="Tableland"
            width="150"
            src={tablelandLogo}
          />
        </p>
      </div>
      <Table messages={messages} />
      <div className="mb-10"></div>
      <div className="bg-gradient-to-r from-transparent via-violet-400 to-transparent h-px"></div>
    </>
  );
}

export default App;
