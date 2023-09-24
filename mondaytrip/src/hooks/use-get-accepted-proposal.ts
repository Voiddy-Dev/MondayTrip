import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Proposal } from '@/lib/types';

interface UseGetAcceptedProposalResponse {
  proposal: Proposal | never[];
  isLoading: boolean;
}

interface UseGetAcceptedProposalProps {
  networkId: number;
  tripId: number;
}


const useGetAcceptedProposal = ({
  networkId,
  tripId,
}: UseGetAcceptedProposalProps): UseGetAcceptedProposalResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getAcceptedProposal',
    args: [
      BigInt(tripId)
    ],
  });

  return {
    proposal: data ?? [],
    isLoading,
  };
};

export default useGetAcceptedProposal;