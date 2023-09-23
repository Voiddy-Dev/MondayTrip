'use client'
import { ContentFocus, useActiveWallet, useProfilesOwnedBy, useCreatePost } from '@lens-protocol/react-web';

export default function Create() {
    const { data: wallet, loading: loadingWallet } = useActiveWallet();

    if (loadingWallet) return <div>Loading wallet...</div>; // Or any other loading UI

    if (!wallet?.address) return <div>Not logged in</div>;

    const { data: profiles, loading: loadingProfilesOwnedBy, hasMore, next } = useProfilesOwnedBy({
        address: wallet.address,
        limit: 25
    })

    if (loadingProfilesOwnedBy) return <div>Loading...</div>; // Or any other loading UI

    if (profiles) {
        console.log(profiles)
    }

    // const { execute: create, error, isPending } = useCreatePost({ publisher: wallet, upload: uploadJson });

    // async function uploadJson(data: unknown) {
    //     try {
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //         })
    //         const json = await response.json()
    //         return json.url
    //     } catch (err) {
    //         console.log({ err })
    //     }
    // }

    // create post function
    // async function createPost() {
    //     console.log('create post');
    //     await create({
    //         content: "Hello World",
    //         contentFocus: ContentFocus.TEXT_ONLY,
    //         tags: ["nyc"],
    //         locale: 'en',
    //     })
    // }

    return (
        <div className="flex flex-col p-12 items-start">
            <div>
                <h1>Wallet</h1>
                {loadingWallet ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {!wallet ? (
                            <div>No wallet was found.</div>
                        ) : (
                            <div>
                                <p>You are logged-in with {wallet.address}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div>
                <h1>Profiles</h1>
                {loadingProfilesOwnedBy ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {!profiles || profiles.length === 0 ? (
                            <div>No profiles were found.</div>
                        ) : (
                            <ul>
                                {profiles.map(profile => (
                                    <li key={profile.id}>
                                        {profile.handle}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
