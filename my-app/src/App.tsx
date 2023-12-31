import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import {
  filecoinCalibration,
  mantleTestnet,
  polygonMumbai,
  scrollSepolia,
} from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./App.css";
import Form from "./Form";
import Table from "./Table";
import tablelandLogo from "./assets/tableland.svg";
import {
  FILECOIN_GUESTBOOK_ADDRESS,
  MANTLE_GUESTBOOK_ADDRESS,
  SCROLL_GUESTBOOK_ADDRESS,
  TableRow,
  TableRowWithChain,
  queryEVMTestnetMessages,
  queryTable,
} from "./common";

function App() {
  const [messages, setMessages] = useState<TableRowWithChain[]>([]);
  const [refreshVar, setRefreshVar] = useState(false);

  const refresh = () => {
    setRefreshVar((v) => !v);
  };

  useEffect(() => {
    const fetchData = async () => {
      const scrollMessages = await queryEVMTestnetMessages(
        SCROLL_GUESTBOOK_ADDRESS,
        scrollSepolia
      );
      const mantleMessages = await queryEVMTestnetMessages(
        MANTLE_GUESTBOOK_ADDRESS,
        mantleTestnet
      );
      const filecoinMessages = await queryEVMTestnetMessages(
        FILECOIN_GUESTBOOK_ADDRESS,
        filecoinCalibration
      );
      const tableLandMessages = (await queryTable()).map((row: TableRow) => ({
        ...row,
        chain: "tableland",
      }));

      setMessages(
        scrollMessages
          .concat(mantleMessages, tableLandMessages, filecoinMessages)
          .sort((a, b) => b.id - a.id)
      );
    };
    fetchData().catch(console.error);
  }, [refreshVar]);

  const { chains, publicClient } = configureChains(
    [polygonMumbai, scrollSepolia, mantleTestnet],
    [
      alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID || "" }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Guestbook",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl leading-tight font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-700 text-transparent">
            X-Chain Guestbook
          </h2>
          <p className="mt-2 lg:text-lg text-gray-800 dark:text-gray-200">
            Built with{" "}
            <a href="https://tablescan.io/guestbook_80001_8065" target="_blank">
              <img
                style={{ display: "inline-block" }}
                alt="Tableland"
                width="150"
                src={tablelandLogo}
              />
            </a>
          </p>
        </div>
        <Table messages={messages} />
        <div className="mb-10"></div>
        <div className="bg-gradient-to-r from-transparent via-violet-400 to-transparent h-px"></div>
        <Form refresh={refresh} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
