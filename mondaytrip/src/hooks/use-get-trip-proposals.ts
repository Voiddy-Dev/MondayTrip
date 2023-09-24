import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Proposal } from '@/lib/types';

interface UseGetTripProposalsResponse {
  proposals: readonly Proposal[];
  isLoading: boolean;
}

interface UseGetTripProposalsProps {
  networkId: number;
  tripId: number;
}


const useGetTripProposals = ({
  networkId,
  tripId,
}: UseGetTripProposalsProps): UseGetTripProposalsResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getTripProposals',
    args: [
      BigInt(tripId)
    ],
  });

  return {
    proposals: data ?? [],
    isLoading,
  };
};

export default useGetTripProposals;