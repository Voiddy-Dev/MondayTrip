import { isValidAddress, useCanMessage } from "@xmtp/react-sdk";
import { useState, useCallback, FormEvent } from "react";

export const CanMessage: React.FC = () => {
  const [peerAddress, setPeerAddress] = useState("");
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { canMessage } = useCanMessage();

  const handleAddressChange = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    setPeerAddress(e.target.value);
  }, []);

  const handleCheckAddress = useCallback(async (e: FormEvent) => {
      e.preventDefault();
      if (isValidAddress(peerAddress)) {
        setIsLoading(true);
        setIsOnNetwork(await canMessage(peerAddress));
        setIsLoading(false);
      } else {
        setIsOnNetwork(false);
      }
    };
    void checkAddress();
  }, [peerAddress]);

  return (
    <form onSubmit={handleCheckAddress}>
      <input
        name="addressInput"
        type="text"
        onChange={handleAddressChange}
        disabled={isLoading}
      />
    </form>
  );
};