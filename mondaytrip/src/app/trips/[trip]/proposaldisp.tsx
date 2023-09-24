import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { DateRange } from 'react-day-picker';
import { Calendar } from "@/components/ui/calendar"
import { Proposal } from "./proposal"

const tripContainer = `
  flex
  flex-col
  justify-center
  items-center
  max-w-2xl
  mx-auto
`;

const tripInfo = `
  flex
  flex-col
  w-full
  px-4
  py-2
  bg-gray-100
  rounded-md
  shadow-md
`;

const tripHeader = `
  text-xl
  font-bold
  text-gray-800
`;

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
    return (
        <AccordionItem value={`item-${key}`}>
            <AccordionTrigger>{proposal.hostelName}</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Description</h3>
                    <p className={tripDetail}>{proposal.hostelDescription}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Location</h3>
                    <p className={tripDetail}>{proposal.hostelLocation}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Price</h3>
                    <p className={tripDetail}>{proposal.totalPriceToPay}</p>
                </div>
                <hr className="my-2" />
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Dates</h3>
                    <Calendar className="hw-full mx-auto" selected={proposal.dateRange} defaultMonth={proposal.startDate} />
                </div>
                <p className={tripDetail}>Approvals: {proposal.approvals}</p>
            </AccordionContent>
        </AccordionItem>
    )
}