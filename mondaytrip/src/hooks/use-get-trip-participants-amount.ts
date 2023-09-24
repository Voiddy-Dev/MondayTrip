import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseGetTripParticipantsAmountResponse {
  participantsAmount: bigint | never[];
  isLoading: boolean;
}

interface UseGetTripParticipantsAmountProps {
  networkId: number;
  tripId: number;
}


const useGetTripParticipantsAmount = ({
  networkId,
  tripId,
}: UseGetTripParticipantsAmountProps): UseGetTripParticipantsAmountResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getTripParticipantsAmount',
    args: [
      BigInt(tripId)
    ],
  });

  return {
    participantsAmount: data ?? [],
    isLoading,
  };
};

export default useGetTripParticipantsAmount;