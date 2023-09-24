import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseGetTripParticipantsResponse {
  participants: readonly `0x${string}`[];
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
    functionName: 'getTripParticipants',
    args: [
      BigInt(tripId)
    ],
  });

  return {
    participants: data ?? [],
    isLoading,
  };
};

export default useGetTripParticipants;