import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Hostel } from '@/lib/types';

interface UseGetHostelResponse {
  trips: Hostel | never[];
  isLoading: boolean;
}

interface UseGetHostelProps {
  networkId: number;
  hostelId: number;
}


const useGetTrip = ({
  networkId,
  hostelId,
}: UseGetHostelProps): UseGetHostelResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getHostel',
    args: [
      BigInt(hostelId)
    ],
  });

  return {
    trips: data ?? [],
    isLoading,
  };
};

export default useGetTrip;