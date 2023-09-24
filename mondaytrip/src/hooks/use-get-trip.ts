import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Trip } from '@/lib/types';

interface UseGetTripResponse {
  trip: Trip | undefined;
  isLoading: boolean;
}

interface UseGetTripProps {
  networkId: number;
  _tripId: number;
}


const useGetTrip = ({
  networkId,
  _tripId,
}: UseGetTripProps): UseGetTripResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getTrip',
    args: [
      BigInt(_tripId)
    ],
  });

  return {
    trip: data ?? undefined,
    isLoading,
  };
};

export default useGetTrip;