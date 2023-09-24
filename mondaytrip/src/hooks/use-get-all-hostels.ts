import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Hostel } from '@/lib/types';

interface UseGetAllHostelsResponse {
  hostels: readonly Hostel[];
  isLoading: boolean;
}

interface UseGetAllHostelsProps {
  networkId: number;
}

const useGetAllHostels = ({
  networkId,
}: UseGetAllHostelsProps): UseGetAllHostelsResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getAllHostels',
  });

  return {
    hostels: data ?? [],
    isLoading,
  };
};

export default useGetAllHostels;