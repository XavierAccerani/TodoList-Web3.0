import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const contractAddress = "0x5Fa717F081f29c2c804cAdAED74501888016843c";
  const [input, setInput] = useState("");
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getTodo");
  return (
    <div className={styles.container}>
      {address ? (
        <>
          <div className={styles.todoForm}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Todo"
            />
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call("setTodo", input)}
              accentColor="#1ce"
            >
              set Todo
            </Web3Button>
          </div>
          <div className={styles.todo}>
            {isLoading ? (
              "Loading...."
            ) : (
              <ul>
                {data.map((item: string, index: number) => (
                  <li key={index} className={styles.todo}>
                    {item}
                    <Web3Button
                      contractAddress={contractAddress}
                      action={(contract) => contract.call("deleteTodo", index)}
                      accentColor="#1ce"
                    >
                      Delete Todo
                    </Web3Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};

export default Home;
