"use client";

import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Profile() {
    const fakeProfile = {
        name: "Satoshi Nakamoto",
    }

    const liBadges = [
        {
            name: "Hike",
            description: "You've hiked 10 miles!",
            createdAt: new Date(),
        },
        {
            name: "Run",
            description: "You've run 10 miles!",
            createdAt: new Date(),
        }
    ];


    const [profile, setProfile] = useState(fakeProfile);

    useEffect(() => {
        setProfile(fakeProfile);
    }, [fakeProfile]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="text-xl font-medium text-gray-600">{fakeProfile.name}</p>
            <hr className="my-2" />
            <h2 className="text-2xl font-bold mb-2">Badges</h2>
            <div className="flex flex-horizontal space-x-2 items-center mb-2">
                {liBadges.map((badge, index) => {
                    return (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <div className="flex flex-col items-center">
                                    <Avatar id={`avatar-${index}`}>
                                        <AvatarImage
                                            src={`https://noun-api.com/beta/pfp?name=${badge.name}`}
                                            alt={`Profile picture of ${badge.name}`}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Label htmlFor={`avatar-${index}`}>{badge.name}</Label>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                {/* {badge.description} */}

                                {/* display the badge.description and badge.createdAt */}
                                <div className="flex flex-col">
                                    <h3 className="text-base font-medium text-gray-600">Description</h3>
                                    <p className="text-sm font-normal text-gray-400">{badge.description}</p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-base font-medium text-gray-600">Date</h3>
                                    <p className="text-sm font-normal text-gray-400">{badge.createdAt.toDateString()}</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                })}
            </div>
        </div>
    )
}