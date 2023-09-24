import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';

interface UseGetUserTripsResponse {
  trips: readonly bigint[];
  isLoading: boolean;
}

interface UseGetUserTripsProps {
  networkId: number;
  userAddress: string;
}


const useGetUserTrips = ({
  networkId,
  userAddress,
}: UseGetUserTripsProps): UseGetUserTripsResponse => {
  const {
    data,
    isLoading,
    error
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getUserTrips',
    args: [
      userAddress as `0x${string}`
    ],
  });

  console.log(data)

  if (error) {
    console.error(error);
  }

  return {
    trips: data ?? [],
    isLoading,
  };
};

export default useGetUserTrips;