"use client"
import { useCallback, useEffect, useState } from "react";

import { useAccount, usePublicClient, useSignMessage } from "wagmi";

import {
    useInitWeb3InboxClient,
    useManageSubscription,
    useW3iAccount,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import useSendNotification from "../../utils/useSendNotification";
import { useInterval } from "usehooks-ts";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

export default function Notifications() {
    /** Web3Inbox SDK hooks **/
    const isW3iInitialized = useInitWeb3InboxClient({
        projectId,
        domain: appDomain,
    });

    const {
        account,
        setAccount,
        register: registerIdentity,
        identityKey,
    } = useW3iAccount();

    const {
        subscribe,
        unsubscribe,
        isSubscribed,
        isSubscribing,
        isUnsubscribing,
    } = useManageSubscription(account);

    const { address } = useAccount({
        onDisconnect: () => {
            setAccount("");
        },
    });

    const { signMessageAsync } = useSignMessage();
    const wagmiPublicClient = usePublicClient();

    const { handleSendNotification, isSending } = useSendNotification();
    const [lastBlock, setLastBlock] = useState<string>();
    const [isBlockNotificationEnabled, setIsBlockNotificationEnabled] =
      useState(true);
  
    const signMessage = useCallback(
      async (message: string) => {
        const res = await signMessageAsync({
          message,
        });
  
        return res as string;
      },
      [signMessageAsync]
    );

    // We need to set the account as soon as the user is connected
    useEffect(() => {
        if (!Boolean(address)) return;
        setAccount(`eip155:1:${address}`);
    }, [signMessage, address, setAccount]);

    const handleRegistration = useCallback(async () => {
        if (!account) return;
        try {
        await registerIdentity(signMessage);
        } catch (registerIdentityError) {
        console.error({ registerIdentityError });
        }
    }, [signMessage, registerIdentity, account]);

    useEffect(() => {
        if (!identityKey) {
        handleRegistration();
        }
    }, [handleRegistration, identityKey]);

    // handleSendNotification will send a notification to the current user and includes error handling.
    // If you don't want to use this hook and want more flexibility, you can use sendNotification.
    const handleTestNotification = useCallback(async () => {
        handleSendNotification({
            title: "GM Hacker",
            body: "Hack it until you make it!",
            icon: `${window.location.origin}/WalletConnect-blue.svg`,
            url: window.location.origin,
            type: "promotional",
        });
        console.log("it triggers");
    }, [handleSendNotification]);

    return (
        <div>
            <p>Subscribe to notifications</p>
            <button onClick={handleTestNotification}>
                Send test notification
            </button>
        </div>
    )
}