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

export default function ProposalDisp({ proposal }: { proposal: Proposal }) {
    return (
        <AccordionItem>
            <AccordionTrigger>
                <div className="flex flex-horizontal space-x-2 items-center mb-2">
                    <h3 className={tripSubheader}>Hostel: {proposal.hostelName}</h3>
                    <p className={tripDetail}>Location: {proposal.hostelLocation}</p>
                    <p className={tripDetail}>Price: {proposal.totalPriceToPay}</p>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Description</h3>
                    <p className={tripDetail}>{proposal.hostelDescription}</p>
                </div>
                <hr className="my-2" />
                <div className="flex flex-col">
                    <h3 className={tripSubheader}>Dates</h3>
                    <Calendar className="hw-full mx-auto" selected={proposal.dateRange} defaultMonth={proposal.startDate} />
                </div>
                <hr className="my-2" />
                <p className={tripDetail}>Approvals: {proposal.approvals}</p>
            </AccordionContent>
        </AccordionItem>
    )
}