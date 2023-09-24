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
import TripStatusComponent from "@/components/tripstatus"
import { Trip } from "@/lib/types"


export default function TripCard({ trip }: { trip: Trip }) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{trip.name}</CardTitle>
                <CardDescription>{trip.description}</CardDescription>
                <TripStatusComponent status={trip.status} />
            </CardHeader>
            <CardContent>
                <p>Location: {trip.information.location}</p>
                <p>Start Date: {trip.information.startDate}</p>
                <p>End Date: {trip.information.endDate}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/trips/${trip.id}`}>
                    <Button>View Trip</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
