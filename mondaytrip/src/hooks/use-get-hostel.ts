import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Hostel } from '@/lib/types';

interface UseGetHostelResponse {
  hostel: Hostel | undefined;
  isLoading: boolean;
}

interface UseGetHostelProps {
  networkId: number;
  hostelId: number;
}


const useGetHostel = ({
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
    hostel: data ?? undefined,
    isLoading,
  };
};

export default useGetHostel;