import React from 'react'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import StartupCard ,{ StartupTypeCard } from './StartupCard'



const UserStartups =  async ({id} : {id : string}) => {

    const startup = await client.fetch(STARTUP_BY_AUTHOR_QUERY,{id});
  return <>
        {startup.length > 0 ? startup.map((startup : StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        )) : (
          <p className="no-result">No startups found</p>
        )}
    </>
}

export default UserStartups