import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseGetTripParticipantsResponse {
  participantsAmount: bigint | never[];
  isLoading: boolean;
}

interface UseGetTripParticipantsProps {
  networkId: number;
  tripId: number;
}


const useGetTripParticipants = ({
  networkId,
  tripId,
}: UseGetTripParticipantsProps): UseGetTripParticipantsResponse => {
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

export default useGetTripParticipants;