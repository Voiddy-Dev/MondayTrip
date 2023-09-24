import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Trip } from '@/lib/types';

interface UseGetAllTripsResponse {
  trips: readonly Trip[];
  isLoading: boolean;
}

interface UseGetAllTripsProps {
  networkId: number;
}


const useGetAllTrips = ({
  networkId,
}: UseGetAllTripsProps): UseGetAllTripsResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getAllTrips',
  });

  return {
    trips: data ?? [],
    isLoading,
  };
};

export default useGetAllTrips;