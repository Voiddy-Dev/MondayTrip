import { Client, useClient } from "@xmtp/react-sdk";
import type { Signer } from "@xmtp/react-sdk";
import { useEffect } from "react";

export const CreateClientWithKeys: React.FC<{ signer: Signer }> = ({ signer }) => {
  const { initialize } = useClient();

  // initialize client on mount
  useEffect(() => {
    const init = async () => {
      // get the keys using a valid Signer
      const keys = await Client.getKeys(signer);
      // create a client using keys returned from WgetKeys
      const options = {
        persistConversations: false,
        env: "dev",
      };
      await initialize({ keys, options, signer });
    };
    void init();
  }, []);

  return (
    <></>
  );
};