"use client";
import TripStatus from "@/components/tripstatus";
import { useParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker';
import UserProfile from "./userprofile";
import { useEnsName, useNetwork } from 'wagmi'
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ProposalDisp from "./proposaldisp";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Proposal, Trip } from "@/lib/types";
import { useCreateProposal, useGetAcceptedProposal, useGetAllHostels, useGetTrip, useGetTripParticipants, useGetTripProposals, useInviteParticipant } from "@/hooks";
import { lineaTestnet } from "wagmi/chains";

// Define the Tailwind CSS styles
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

export default function Trip() {
    const [bookedDataRange, setBookedDataRange] = useState<DateRange | undefined>(undefined);
    const [bookedStartDate, setBookedStartDate] = useState<Date | undefined>(undefined);
    const [alreadyApproved, setAlreadyApproved] = useState<boolean>(false);
    const [newParticipant, setNewParticipant] = useState("");
    const { chain } = useNetwork();
    const params = useParams();
    const { trip } = useGetTrip({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
        _tripId: Number(params.trip)
    });

    const { participants } = useGetTripParticipants({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
        tripId: Number(params.trip)
    });

    const { proposals: tripProposals } = useGetTripProposals({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
        tripId: Number(params.trip)
    })

    const { proposal: acceptedProposal } = useGetAcceptedProposal({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
        tripId: Number(params.trip)
    })

    const { hostels } = useGetAllHostels({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
    })

    const { sendTransaction: inviteParticipant } = useInviteParticipant({
        networkId: chain?.id ? chain.id : lineaTestnet.id,
        tripId: Number(params.trip),
        participant: newParticipant
    })

    const liHostels = [
        {
            hostelId: 1,
            hostelName: "Hostel 1",
            hostelDescription: "Hostel 1 description",
            hostelLocation: "Hostel 1 location",
        },
        {
            hostelId: 2,
            hostelName: "Hostel 2",
            hostelDescription: "Hostel 2 description",
            hostelLocation: "Hostel 2 location",
        },
        {
            hostelId: 3,
            hostelName: "Hostel 3",
            hostelDescription: "Hostel 3 description",
            hostelLocation: "Hostel 3 location",
        }
    ]

    const organizerEnsName = useEnsName({ address: trip?.organizer as `0x${string}` | undefined, chainId: 1 })
    const organizerDisplayName = organizerEnsName.data || (trip && trip.organizer);

    return (
        <>
            {trip === undefined ? (
                <h1>Not a trip</h1>
            ) : (
                <>
                    <div className={tripContainer}>
                        <div className={tripInfo}>
                            {/* add a header with the name, description and trip status - make it as a vertical block */}
                            <div className="flex flex-col mb-4">
                                <h2 className={tripHeader}>{trip.name}</h2>
                                <h3 className={tripSubheader}>Where: {trip.information.location === '' ? "To be determined" : trip.information.location}</h3>
                                <p className={tripDetail}>Organized by: {trip.organizer}</p>
                            </div>

                            <TripStatus
                                status={trip.status}
                            />

                            <hr className="my-2" />

                            <div className="flex flex-col">
                                <h3 className={tripSubheader}>Description</h3>
                                <p className={tripDetail}>{trip.description}</p>
                            </div>

                            <hr className="my-2" />

                            {tripProposals !== undefined && trip.status === 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {tripProposals?.map((proposal) =>
                                        <ProposalDisp key={Number(proposal.hostelId)} proposal={proposal} />
                                    )}
                                </Accordion>
                                // <></>
                            ) : (
                                <div className="flex flex-col">
                                    <h3 className={tripSubheader}>Dates</h3>
                                    {trip.information !== undefined && bookedDataRange && bookedStartDate ? (
                                        <Calendar className="hw-full mx-auto" selected={bookedDataRange} defaultMonth={bookedStartDate} />
                                    ) : (<></>)}
                                </div>
                            )}

                            <div className="flex flex-col space-y-2">
                                <h2 className={tripHeader}>Your approvals</h2>
                                <div className="flex flex-col space-y-2">

                                    {alreadyApproved === false ? (<>
                                        {tripProposals?.map((proposal, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                { /* I want to check a checkbox if the index is in the `approvedProposals` array */}
                                                <Checkbox id={`terms${index}`} />
                                                <label
                                                    htmlFor="terms2"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {hostels[Number(proposal.hostelId)].name}
                                                </label>
                                            </div>
                                        ))}
                                        <Button>Approve</Button>
                                    </>
                                    ) : (<>
                                        {tripProposals?.map((proposal, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                { /* I want to check a checkbox if the index is in the `approvedProposals` array */}
                                                <Checkbox id={`terms${index}`} checked={proposal.approvals > 0} disabled />
                                                <label
                                                    htmlFor="terms2"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {hostels[Number(proposal.hostelId)].name}
                                                </label>
                                            </div>
                                        ))}</>)}
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* add a new container that will contain the users that joined the trip */}
                    <div className={tripContainer}>
                        <div className={tripInfo}>
                            <h2 className={tripHeader}>Travelers</h2>
                            <hr className="my-2" />
                            {participants.map((user) => (
                                <UserProfile key={user} address={user as `0x${string}`} />
                            ))}
                            <input type="text" value={newParticipant} onChange={(e) => setNewParticipant(e.target.value)} />
                            <button onClick={() => inviteParticipant()}>Invite a new participant</button>
                        </div>
                    </div>

                    {/*I want to add space at the bottom so that the contain ends before the end of the scrolling*/}
                    <div className="h-20"></div>
                </>
            )}
        </>
    );
}