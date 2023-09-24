import { Badge } from "@/components/ui/badge"

// Trip status takes in an enum of trip status
export default function TripStatus({ status }: { status: "Planning" | "Booked" | "Finished" }) {
    // return a badge with the different colors for each status
    if (status === "Planning") {
        return <Badge color="blue">Planning</Badge>
    } else if (status === "Booked") {
        return <Badge color="green">Booked</Badge>
    } else {
        return <Badge color="gray">Finished</Badge>
    }
}