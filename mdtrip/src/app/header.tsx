import { useActiveWallet } from '@lens-protocol/react-web';

export default function Header() {
  const { data: wallet, loading } = useActiveWallet();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (wallet) {
    return <p>You are logged-in with {wallet.address}</p>;
  } 

  return <p>You are logged-out</p>;
}