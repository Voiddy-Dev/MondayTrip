import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TripCard from "@/components/tripcard"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Trips() {
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

    return (
        <>
            <div className="flex space-x-4 p-4 mx-auto">
                {listMockTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add a new trip</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add a new trip</DialogTitle>
                            <DialogDescription>
                                Add information about your trip here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue="Trip to the moon"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    defaultValue="A trip to the moon"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="maxpeople" className="text-right">
                                    Limit Invites
                                </Label>
                                <Input
                                    id="maxpeople"
                                    defaultValue="10"
                                    type="number"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}