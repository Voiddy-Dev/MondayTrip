import { Web3Button } from "@web3modal/react"

export default function Header() {
    return (
        <div className="flex items-center justify-between py-4 mx-4">
            <div className="flex items-center">
                <img src="/next.svg" alt="Logo" className="w-10 h-10" />
                <h1 className="ml-2 text-2xl font-bold">MondayTrip</h1>
            </div>
            <div className="flex items-center">
                <a href="#" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">Home</a>
                <a href="/explore" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">Explore</a>
                <a href="/trips" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">My Trips</a>
            </div>
            <div className="flex items-center">
                <Web3Button />
            </div>
        </div>
    )
}