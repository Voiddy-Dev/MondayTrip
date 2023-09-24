import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useMemo } from 'react';
import { UseWriteTransactionResponse } from '../lib/types';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseInviteParticipantProps {
  networkId: number;
  tripId: number;
  participant: string;
}

const useInviteParticipant = ({
  networkId,
  tripId,
  participant
}: UseInviteParticipantProps): UseWriteTransactionResponse => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: plannerAddress,
    abi: plannerAbi,
    functionName: 'inviteParticipant',
    chainId: networkId,
    args: [
      BigInt(tripId),
      participant as `0x${string}`,
    ],
  });

  const {
    data,
    write,
    error,
    isError,
  } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const errors: (string | unknown)[] = useMemo(() => {
    let allErrors: (string | unknown)[] = [];
    if (prepareError) {
      allErrors = [...allErrors, prepareError.message];
    }
    if (error) {
      allErrors = [...allErrors, error.message];
    }
    return allErrors;
  }, [prepareError, error]);

  return {
    sendTransaction: write ?? (() => { }),
    data: data ?? undefined,
    isLoading,
    isSuccess,
    prepareError: prepareError?.message ?? null,
    isPrepareError,
    error: error?.message ?? null,
    isError,
    errors,
    isSomeError: isPrepareError || isError,
  };
};

export default useInviteParticipant;