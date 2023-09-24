"use client";
import TripStatus from "@/components/tripstatus";
import { useParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker';
import UserProfile from "./userprofile";
import { useEnsName } from 'wagmi'


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
        },
    ]

    // make a trip varable that corresponds to `params.trip` (integer value) in the `listMockTrips` if it doesnt exist return a non existent trip error
    const tripObj = listMockTrips.find((trip) => trip.id === Number(params.trip));
    if (tripObj === undefined) {
        return <h1>Not a trip</h1>
    }

    const startDate = new Date(tripObj.tripinfo.startDate);
    const endDate = new Date(tripObj.tripinfo.endDate);

    const daterange: DateRange = {
        from: startDate,
        to: endDate
    }


    // find organizer name using `useEnsName`
    const organizerEnsName = useEnsName({ address: tripObj.organizer as `0x${string}`, chainId: 1 })
    const organizerdisplayname = organizerEnsName.data || tripObj.organizer;

    return (
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

                    <div className="flex flex-col">
                        <h3 className={tripSubheader}>Dates</h3>
                        {/* add a calendar with the start date and end date - make it at the center of the container and take full space */}
                        <Calendar className="hw-full mx-auto" selected={daterange} defaultMonth={startDate} />
                    </div>

                    {/* <h3 className={tripSubheader}>Trip Details</h3>
                <hr className="my-2" /> */}
                    {/* <p className={tripDetail}>Organized by: {tripObj.organizer}</p> */}
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
    );
}