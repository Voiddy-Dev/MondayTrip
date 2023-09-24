import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import TripStatus from "@/components/tripstatus"


export default function TripCard({ trip }: { trip: any }) {
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
            <CardFooter>
                <Link href={`/trips/${trip.id}`}>
                    <Button>View Trip</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
