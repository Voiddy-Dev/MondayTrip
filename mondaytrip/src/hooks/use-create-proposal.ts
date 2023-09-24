import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useMemo } from 'react';
import { UseWriteTransactionResponse } from '../lib/types';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseCreateProposalProps {
  networkId: number;
  tripId: number;
  startDate: string;
  endData: string;
  numberOfNights: number;
  hostelId: number;
}

const useCreateProposal = ({
  networkId,
  tripId,
  startDate,
  endData,
  numberOfNights,
  hostelId,
}: UseCreateProposalProps): UseWriteTransactionResponse => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: plannerAddress,
    abi: plannerAbi,
    functionName: 'proposeProposal',
    chainId: networkId,
    args: [
      BigInt(tripId),
      startDate,
      endData,
      BigInt(numberOfNights),
      BigInt(hostelId),
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

export default useCreateProposal;