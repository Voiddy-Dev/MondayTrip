"use client";
import TripStatus from "@/components/tripstatus";
import { useParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker';
import UserProfile from "./userprofile";
import { useEnsName } from 'wagmi'
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Proposal } from "./proposal";
import ProposalDisp from "./proposaldisp";


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
    interface TripObj {
        id: number;
        name: string;
        description: string;
        maxPeople: number;
        status: string;
        organizer: string;
        tripinfo: {
            location: string;
            startDate: string;
            endDate: string;
        };
        tripproposals: StrProposal[];

    }

    const [bookedDataRange, setBookedDataRange] = useState<DateRange | undefined>(undefined);
    const [bookedStartDate, setBookedStartDate] = useState<Date | undefined>(undefined);

    const [tripProposals, setTripProposals] = useState<Proposal[] | undefined>(undefined);
    const [tripObj, setTripObj] = useState<TripObj | undefined>(undefined);

    const params = useParams();

    const listOfTravelers = [
        {
            address: "0x123",
        },
        {
            address: "0xbA8A669738F217059a312e3F11c9b2E7344605c5",
        },
        {
            address: "0x789",
        },
    ]

    const listMockTrips = [
        {
            id: 1,
            name: "Trip to the moon",
            description: "A trip to the moon",
            maxPeople: 10,
            status: "Planning",
            organizer: "0x123",
            tripinfo: {
                location: "Moon",
                startDate: "2021-10-10",
                endDate: "2021-10-20",
            },
            tripproposals: [
                {
                    hostelId: 1,
                    startDate: "2021-10-10",
                    endDate: "2021-10-20",
                    totalPriceToPay: 100,
                    approvals: 5,
                },
                {
                    hostelId: 2,
                    startDate: "2021-12-10",
                    endDate: "2022-10-20",
                    totalPriceToPay: 200,
                    approvals: 5,
                },
                {
                    hostelId: 3,
                    startDate: "2023-10-10",
                    endDate: "2023-10-20",
                    totalPriceToPay: 300,
                    approvals: 5,
                }
            ]
        },
        {
            id: 2,
            name: "Trip to the mars",
            description: "A trip to the mars",
            maxPeople: 10,
            status: "Booked",
            organizer: "0xbA8A669738F217059a312e3F11c9b2E7344605c5",
            tripinfo: {
                location: "Mars",
                startDate: "2021-10-10",
                endDate: "2021-10-20",
            },
            tripproposals: [
                {
                    hostelId: 1,
                    startDate: "2021-10-10",
                    endDate: "2021-10-20",
                    totalPriceToPay: 100,
                    approvals: 5,
                },
                {
                    hostelId: 2,
                    startDate: "2021-12-10",
                    endDate: "2022-10-20",
                    totalPriceToPay: 200,
                    approvals: 3,
                },
                {
                    hostelId: 3,
                    startDate: "2023-10-10",
                    endDate: "2023-10-20",
                    totalPriceToPay: 300,
                    approvals: 2,
                }
            ]
        },
    ]

    // use a useEffect to get the trip data from the backend

    useEffect(() => {
        const o = listMockTrips.find((trip) => trip.id === Number(params.trip));
        setTripObj(o);

        if (o !== undefined) {
            if (o.tripinfo !== undefined) {
                const startDate = new Date(o.tripinfo.startDate);
                const endDate = new Date(o.tripinfo.endDate);

                const daterange: DateRange = {
                    from: startDate,
                    to: endDate
                }

                setBookedDataRange(daterange);
                setBookedStartDate(startDate);
            }

            if (o.tripproposals !== undefined) {
                const proposalList: StrProposal[] = [];
                for (const strproposal of o.tripproposals) {
                    proposalList.push({ ...strproposal });
                }
                setTripProposals(convertTripProposalsToDateObjects(proposalList));
            }
        }

    }, [params.trip]);

    // make a trip varable that corresponds to `params.trip` (integer value) in the `listMockTrips` if it doesnt exist return a non existent trip error
    // const tripObj = listMockTrips.find((trip) => trip.id === Number(params.trip));
    // if (tripObj === undefined) {
    //     return <h1>Not a trip</h1>
    // }

    // `useEffect` on `tripObj.tripinfo`
    // if `tripObj.tripinfo` is not undefined then set the `bookedDataRange` and `bookedStartDate` to the values of `tripObj.tripinfo.startDate` and `tripObj.tripinfo.endDate`
    // `bookedDataRange` and `bookedStartDate` are used to display the calendar
    // useEffect(() => {
    //     if (tripObj.tripinfo !== undefined) {
    //         const startDate = new Date(tripObj.tripinfo.startDate);
    //         const endDate = new Date(tripObj.tripinfo.endDate);

    //         const daterange: DateRange = {
    //             from: startDate,
    //             to: endDate
    //         }

    //         setBookedDataRange(daterange);
    //         setBookedStartDate(startDate);
    //     }

    //     if (tripObj.tripproposals !== undefined) {
    //         const proposalList: StrProposal[] = [];
    //         for (const strproposal of tripObj.tripproposals) {
    //             proposalList.push({ ...strproposal });
    //         }
    //         setTripProposals(convertTripProposalsToDateObjects(proposalList));
    //     }
    // }, [tripObj]);

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

    const convertStrProposalToProposal = (proposal: StrProposal): Proposal => {
        const startDate = new Date(proposal.startDate);
        const endDate = new Date(proposal.endDate);

        const hostelname = liHostels.find((hostel) => hostel.hostelId === proposal.hostelId)?.hostelName as string;
        const hosteldescription = liHostels.find((hostel) => hostel.hostelId === proposal.hostelId)?.hostelDescription as string;
        const hostellocation = liHostels.find((hostel) => hostel.hostelId === proposal.hostelId)?.hostelLocation as string;

        return {
            ...proposal,
            hostelName: hostelname,
            hostelDescription: hosteldescription,
            hostelLocation: hostellocation,
            startDate,
            endDate,
            dateRange: {
                from: startDate,
                to: endDate,
            },
        };
    };

    const convertTripProposalsToDateObjects = (tripProposals: StrProposal[]): Proposal[] => {
        return tripProposals.map(convertStrProposalToProposal);
    };

    interface StrProposal {
        hostelId: number;
        startDate: string;
        endDate: string;
        totalPriceToPay: number;
        approvals: number;
    }

    // useEffect(() => {
    //     if (tripObj.tripproposals !== undefined) {
    //         const proposalList: StrProposal[] = [];
    //         for (const strproposal of tripObj.tripproposals) {
    //             proposalList.push({ ...strproposal });
    //         }
    //         setTripProposals(convertTripProposalsToDateObjects(proposalList));
    //     }
    // }, [tripObj.tripproposals]);

    // find organizer name using `useEnsName`

    const organizerEnsName = useEnsName({ address: tripObj?.organizer as `0x${string}` | undefined, chainId: 1 })
    const organizerdisplayname = organizerEnsName.data || (tripObj && tripObj.organizer);

    return (
        <>
            {tripObj === undefined ? (
                <h1>Not a trip</h1>
            ) : (
                <>
                    <div className={tripContainer}>
                        <div className={tripInfo}>
                            {/* add a header with the name, description and trip status - make it as a vertical block */}
                            <div className="flex flex-col mb-4">
                                <h2 className={tripHeader}>{tripObj.name}</h2>
                                <h3 className={tripSubheader}>Where: {tripObj.tripinfo.location}</h3>
                                <p className={tripDetail}>Organized by: {organizerdisplayname}</p>
                            </div>

                            <TripStatus
                                status={tripObj.status as "Planning" | "Booked" | "Finished"}
                            />

                            <hr className="my-2" />

                            <div className="flex flex-col">
                                <h3 className={tripSubheader}>Description</h3>
                                <p className={tripDetail}>{tripObj.description}</p>
                            </div>

                            <hr className="my-2" />

                            {tripProposals !== undefined && tripObj.status === "Planning" ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {tripProposals?.map((proposal) =>
                                        <ProposalDisp key={proposal.hostelId} proposal={proposal} />
                                    )
                                    }
                                </Accordion>
                                // <></>
                            ) : (
                                <div className="flex flex-col">
                                    <h3 className={tripSubheader}>Dates</h3>
                                    {tripObj.tripinfo !== undefined && bookedDataRange && bookedStartDate ? (
                                        <Calendar className="hw-full mx-auto" selected={bookedDataRange} defaultMonth={bookedStartDate} />
                                    ) : (<></>)}
                                </div>
                            )}



                        </div>
                    </div>

                    {/* add a new container that will contain the users that joined the trip */}
                    <div className={tripContainer}>
                        <div className={tripInfo}>
                            <h2 className={tripHeader}>Travelers</h2>
                            <hr className="my-2" />
                            {listOfTravelers.map((user) => (
                                <UserProfile key={user.address} address={user.address as `0x${string}`} />
                            ))}
                        </div>
                    </div>

                    {/*I want to add space at the bottom so that the contain ends before the end of the scrolling*/}
                    <div className="h-20"></div>
                </>
            )}
        </>
    );
}