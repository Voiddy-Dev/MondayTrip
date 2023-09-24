import { useContractRead } from 'wagmi';
import plannerAbi from '../lib/abi';
import { plannerAddress } from '../lib/constants';
import { Proposal } from '@/lib/types';

interface UseGetProposalResponse {
  proposal: Proposal | never[];
  isLoading: boolean;
}

interface UseGetProposalProps {
  networkId: number;
  proposalId: number;
}


const useGetProposal = ({
  networkId,
  proposalId,
}: UseGetProposalProps): UseGetProposalResponse => {
  const {
    data,
    isLoading,
  } = useContractRead({
    address: plannerAddress,
    abi: plannerAbi,
    chainId: networkId,
    functionName: 'getProposal',
    args: [
      BigInt(proposalId)
    ],
  });

  return {
    proposal: data ?? [],
    isLoading,
  };
};

export default useGetProposal;