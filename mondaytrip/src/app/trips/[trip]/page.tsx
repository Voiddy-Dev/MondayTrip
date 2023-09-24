"use client";
import { useParams } from "next/navigation"

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
            organizer: "0x123",
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

    return (
        <div className={tripContainer}>
            <div className={tripInfo}>
                <h2 className={tripHeader}>{tripObj.name}</h2>
                <h3 className={tripSubheader}>{tripObj.description}</h3>
                <p className={tripDetail}>Location: {tripObj.tripinfo.location}</p>
                <p className={tripDetail}>Start Date: {tripObj.tripinfo.startDate}</p>
                <p className={tripDetail}>End Date: {tripObj.tripinfo.endDate}</p>
            </div>
        </div>
    );
}