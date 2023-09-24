import { Web3Button } from "@web3modal/react"
import { useAccount } from "wagmi"

export default function Header() {
    const { address } = useAccount();

    const handleHostedFlowClick = () => {
        const url =
            `https://onramp-sandbox.gatefi.com/?merchantId=9e34f479-b43a-4372-8bdf-90689e16cd5b&wallet=${address}&cryptoCurrency=ETH&fiatCurrency=USD`;
        window.open(url, "_blank");
    };

    return (
        <div className="flex items-center justify-between py-4 mx-4">
            <div className="flex items-center">
                <h1 className="ml-2 text-2xl font-bold">MondayTrip</h1>
            </div>
            <div className="flex items-center">
                <a href="#" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">Home</a>
                <a href="/notifications" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">Notifs</a>
                <a href="/explore" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">Explore</a>
                <a href="/trips" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">My Trips</a>
                <button
                    onClick={handleHostedFlowClick}
                    className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    Get Funds
                </button>
            </div>
            <div className="flex items-center">
                <Web3Button />
            </div>
        </div>
    )
}