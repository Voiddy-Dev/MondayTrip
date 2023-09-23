"use client";
import { Suspense } from "react";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SocialLogin from "@biconomy/web3-auth";
import SmartAccount from "@biconomy/smart-account";


const MondayTripSocialLogin = () => {
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string>();
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(
    null
  );

  const connectWeb3 = useCallback(async () => {
    if (typeof window === "undefined") return;
    console.log("socialLoginSDK", socialLoginSDK);
    if (socialLoginSDK?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      return;
    }
    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    const sdk = new SocialLogin();
    await sdk.init({
      chainId: ethers.utils.hexValue(80001),
    });
    setSocialLoginSDK(sdk);
    sdk.showWallet();
    console.log("Account...", account);
    return socialLoginSDK;
  }, [socialLoginSDK]);

  useEffect(() => {
    console.log("hidelwallet");
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
    console.log("socialLoginSDK", socialLoginSDK);
  }, [account, socialLoginSDK]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !account) {
        connectWeb3();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [account, connectWeb3, socialLoginSDK]);

  const disconnectWeb3 = async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await socialLoginSDK.logout();
    socialLoginSDK.hideWallet();
    setProvider(undefined);
    setAccount(undefined);
    setScwAddress("");
  };

  // useEffect(() => {
  //   async function setupSmartAccount() {
  //     setScwAddress("");
  //     setScwLoading(true);
  //     const smartAccount = new SmartAccount(provider, {
  //       activeNetworkId: ChainId.GOERLI,
  //       supportedNetworksIds: [ChainId.GOERLI],
  //     });
  //     await smartAccount.init();
  //     const context = smartAccount.getSmartAccountContext();
  //     setScwAddress(context.baseWallet.getAddress());
  //     setSmartAccount(smartAccount);
  //     setScwLoading(false);
  //   }
  //   if (!!provider && !!account) {
  //     console.log("Provider...", provider);
  //     console.log("Account...", account);
  //     setupSmartAccount();
  //     // console.log("Provider...", provider);
  //   }
  // }, [account, provider]);

  return (
    <div>
      <h1>Authentication</h1>
      <button onClick={!account ? connectWeb3 : disconnectWeb3}>
        {!account ? "Connect Wallet" : "Disconnect Wallet"}
      </button>
    </div>
  );
}

export default function Home() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MondayTripSocialLogin />
      </Suspense>
    </div>
  );
}
