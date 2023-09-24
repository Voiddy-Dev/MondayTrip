"use client"
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import { useWalletConnect } from "@thirdweb-dev/react";

import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Signer, SigningKey, Wallet} from 'ethers';
import {Client, Conversation, DecodedMessage, Stream} from '@xmtp/xmtp-js';

import {utils} from '@noble/secp256k1';

export const INFURA_API_KEY = '2bf116f1cc724c5ab9eec605ca8440e1';
export const RECIPIENT_ADDRESS = 'REPLACE_WITH_ETH_ADDRESS';

const Messages = () => {
  const [client, setClient] = useState<Client>();
  const [signer, setSigner] = useState<Signer>();
  const [address, setAddress] = useState<string>('');
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const connector = useWalletConnect();

  useEffect(() => {
    const initXmtpClient = async () => {
      if (!signer || client || conversation) {
        setIsLoading(false);
        return;
      }
      const xmtp = await Client.create(signer);
      setClient(xmtp);
      setIsLoading(false);
      const newConversation = await xmtp.conversations.newConversation(
        RECIPIENT_ADDRESS,
      );
      setConversation(newConversation);
    };
    initXmtpClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  useEffect(() => {
    if (!client || !conversation) {
      return;
    }
    let messageStream: Stream<DecodedMessage>;
    const closeStream = async () => {
      if (!messageStream) {
        return;
      }
      await messageStream.return();
    };
    const startMessageStream = async () => {
      closeStream();
      messageStream = await conversation.streamMessages();
      for await (const message of messageStream) {
        if (message.senderAddress === client.address) {
          continue
        }
        Alert.alert('Message received', message.content);
      }
    };
    startMessageStream();
    return () => {
      closeStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    await connector?.connect();
  }, [connector]);

  const generateWallet = useCallback(async () => {
    setIsLoading(true);
    const newSigner = new Wallet(utils.randomPrivateKey());
    const newAddress = await newSigner.getAddress();
    setAddress(newAddress);
    setSigner(newSigner);
  }, []);
  
  const sendGm = React.useCallback(async () => {
    if (!conversation) {
      return;
    }
    const message = await conversation.send(
      `gm! ${Platform.OS === 'ios' ? 'from iOS' : 'from Android'}`,
    );
    Alert.alert('Message sent', message.content);
  }, [conversation]);
  
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Example Chat App</Text>
          <Text style={styles.sectionDescription} selectable={true}>
            {client ? address : 'Sign in with XMTP'}
          </Text>
          {isLoading ? (
            <ActivityIndicator style={styles.spinner} />
          ) : (
            <>
            {client ? (
              <Button title="Send gm" onPress={sendGm} />
            ) : (
              <>
                <Button title="Sign in" onPress={connectWallet} />
                <Button title="Generate address" onPress={generateWallet} />
              </>
            )
            }
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Messages;