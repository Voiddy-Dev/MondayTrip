import { SendTransactionResult } from '@wagmi/core';

interface UseWriteTransactionResponse {
  sendTransaction: () => void;
  data: SendTransactionResult | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  prepareError: string | null;
  isPrepareError: boolean;
  error: string | null;
  isError: boolean;
  errors: (string | unknown)[];
  isSomeError: boolean;
}

interface Proposal {
  id: bigint;
  startDate: string;
  endDate: string;
  hostelId: bigint;
  numberOfNights: bigint;
  totalPriceToPay: bigint;
  approvals: bigint;
  status: ProposalStatus;
}

interface Hostel {
  id: bigint;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  pricePerNight: bigint;
  maxPeople: bigint;
  minPeople: bigint;
  owner: string;
  status: HostelStatus;
}

interface Trip {
  id: bigint;
  name: string;
  description: string;
  maxPeople: bigint;
  organizer: string;
  status: TripStatus;
  information: TripInformation;
}

interface TripInformation {
  startDate: string;
  endDate: string;
  location: string;
}

enum HostelStatus {
  Active,
  Booked
}

enum TripStatus {
  Planning,
  Booked,
  Finished
}

enum ProposalStatus {
  Proposed,
  Accepted,
  Denied,
  Paid
}

export type {
  UseWriteTransactionResponse,
  Proposal,
  Trip,
  TripInformation
};