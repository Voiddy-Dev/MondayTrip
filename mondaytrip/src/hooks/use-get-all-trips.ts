import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Trip } from '@/lib/types';

interface UseGetAllTripsResponse {
  proposals: readonly Trip[];
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
    proposals: data ?? [],
    isLoading,
  };
};

export default useGetAllTrips;