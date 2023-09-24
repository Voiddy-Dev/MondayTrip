import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar } from "@/components/ui/calendar"
import { Proposal } from "@/lib/types";
import { useGetHostel } from "@/hooks";
import { useNetwork } from "wagmi";
import { lineaTestnet } from "wagmi/chains";

const tripSubheader = `
  text-base
  font-medium
  text-gray-600
`;

const tripDetail = `
  text-sm
  font-normal
  text-gray-400
`;

export default function ProposalDisp({ key, proposal }: { key: number, proposal: Proposal }) {
  const { chain } = useNetwork();
  const { hostel } = useGetHostel({
    networkId: chain?.id ? chain.id : lineaTestnet.id,
    hostelId: Number(proposal.hostelId),
  })

  return (
    <AccordionItem value={`item-${key}`}>
      <AccordionTrigger>{hostel?.name}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col">
          <h3 className={tripSubheader}>Description</h3>
          <p className={tripDetail}>{hostel?.description}</p>
        </div>
        <div className="flex flex-col">
          <h3 className={tripSubheader}>Location</h3>
          <p className={tripDetail}>{hostel?.location}</p>
        </div>
        <div className="flex flex-col">
          <h3 className={tripSubheader}>Price</h3>
          <p className={tripDetail}>{Number(proposal.totalPriceToPay)}</p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-col">
          <h3 className={tripSubheader}>Dates</h3>
          <Calendar className="hw-full mx-auto" defaultMonth={new Date(proposal.startDate)} />
        </div>
        <p className={tripDetail}>Approvals: {Number(proposal.approvals)}</p>
      </AccordionContent>
    </AccordionItem>
  )
}