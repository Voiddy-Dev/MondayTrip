import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Trip } from '@/lib/types';

interface UseGetTripResponse {
  trips: Trip | never[];
  isLoading: boolean;
}

interface UseGetTripProps {
  networkId: number;
  tripId: number;
}


const useGetTrip = ({
  networkId,
  tripId,
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
      BigInt(tripId)
    ],
  });

  return {
    trips: data ?? [],
    isLoading,
  };
};

export default useGetTrip;