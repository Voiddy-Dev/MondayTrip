import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TripStatus from "@/components/tripstatus"

// Trip card takes in a trip object that has the following structure in solidity:
// enum TripStatus {
//     Planning,
//     Booked,
//     Finished
// }

// struct TripInformation {
//     string startDate;
//     string endDate;
//     string location;
// }

// struct Trip {
//     uint256 id;
//     string name;
//     string description;
//     uint256 maxPeople;
//     TripStatus status;
//     address organizer;

//     TripInformation tripinfo; 
// } 
export default function TripCard({ trip }: { trip: any }) {
    // I want the card to be a link to a specific trip page
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{trip.name}</CardTitle>
                <CardDescription>{trip.description}</CardDescription>
                <TripStatus status={trip.status} />
            </CardHeader>
            <CardContent>
                <p>Location: {trip.tripinfo.location}</p>
                <p>Start Date: {trip.tripinfo.startDate}</p>
                <p>End Date: {trip.tripinfo.endDate}</p>
            </CardContent>
        </Card>
    )
}
