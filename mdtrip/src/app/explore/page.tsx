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

    if (data) {
        console.log(data)
    }

    // Render the publications in a list    
    return (
        <div className="flex flex-col p-12 items-start">
            <h1>Explore Page</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {!data || data.length === 0 ? (
                        <div>No publications were found.</div>
                    ) : (
                        <ul>
                            {data.map(publication => (
                                <li key={publication.id}>
                                    {publication.__typename}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {/* Load the next batch of publications if there are more */}
            {hasMore && (
                <button onClick={next}>Load More</button>
            )}
        </div>
    );
}
