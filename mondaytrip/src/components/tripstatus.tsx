import { Badge } from "@/components/ui/badge"
import { TripStatus } from "@/lib/types"

// Trip status takes in an enum of trip status
export default function TripStatusComponent({ status }: { status: TripStatus }) {
    // return a badge with the different colors for each status
    if (status === 0) {
        return <Badge color="blue">Planning</Badge>
    } else if (status === 1) {
        return <Badge color="green">Booked</Badge>
    } else {
        return <Badge color="gray">Finished</Badge>
    }
}