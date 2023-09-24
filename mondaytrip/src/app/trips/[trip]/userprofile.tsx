import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useEnsAvatar, useEnsName } from 'wagmi'

export default function UserProfile({ address }: { address: `0x${string}` }) {
    const ensName = useEnsName({ address, chainId: 1 })
    const ensAvatar = useEnsAvatar({ name: ensName.data, chainId: 1 })

    console.log(ensName);

    return (
        <div className="flex flex-horizontal space-x-2 items-center">
            <Avatar>
                <AvatarImage
                    src={`https://noun-api.com/beta/pfp?name=${address}`}
                    alt={`Profile picture of ${address}`}
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{address}</p>
        </div>
    )
}