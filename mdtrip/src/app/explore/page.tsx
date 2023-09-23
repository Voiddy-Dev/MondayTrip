// app/page.tsx
'use client'
import {
    useExploreProfiles,
    useExplorePublications,
    PublicationTypes,
    PublicationSortCriteria,
    PublicationMainFocus,
    useReaction,
    useActiveProfile,
    ReactionTypes
} from '@lens-protocol/react-web'
import Link from 'next/link'

export default function Explore() {
    const { data, loading, hasMore, next } = useExplorePublications({
        limit: 25,
        sortCriteria: PublicationSortCriteria.TopCollected,
        publicationTypes: [PublicationTypes.Post],
        metadataFilter: {
            
        }
    });

    // Check if the data is loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if there are no publications
    if (!data?.length) {
        return <div>No publications found.</div>;
    }

    if (data) {
        console.log(data)
    }

    // Render the publications in a list
    return (
        <div className='p-20'>
            <h1>Explore Page</h1>
            <ul>
                {data.map(publication => (
                    <li key={publication.id}>
                        {publication.__typename}
                        {/* <Link href={`/publication/${publication.id}`}> */}
                    </li>
                ))}
            </ul>
            {/* Load the next batch of publications if there are more */}
            {hasMore && (
                <button onClick={next}>Load More</button>
            )}
        </div>
    );
}
