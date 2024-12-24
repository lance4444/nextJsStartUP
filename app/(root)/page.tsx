import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export default async function  Home({ 
  searchParams }: 
  {searchParams: Promise<{query?: string
  }>
}) {
    const query = (await searchParams).query;
    const params = { search: query || null};

    const sessiion  = await auth();

     console.log(sessiion?.id);

    const { data: posts } = await sanityFetch({query: STARTUP_QUERY, params});


     
  return (
  <>
  <section className="pink_container">
  <h1 className="heading">Pitch You Startup, 
    <br />Connect with Entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl">
      Submit Ideas, Vote on Pitches, and Get NOticed in Virtual Competition.
    </p>

    <SearchForm query={query}/>
  </section>

  <section className="section-container max-w-7xl mx-auto px-5 md:px-10 py-8">
    <p className="text-30-semibold">
      {query ? `Search results for "${query}"` : "All Startups"}
    </p>
    <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.length > 0 ? (
        posts.map((post: StartupTypeCard) => (
          <li key={post?._id} className="w-full">
            <StartupCard post={post} />
          </li>
        ))
      ) : (
        <p className="no-results col-span-full text-center py-10">
          No startups found
        </p>
      )}
    </ul>
  </section>
  <SanityLive/>
  </>
  );
}
