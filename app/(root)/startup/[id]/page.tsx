import React from 'react'
import { STARTUP_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import View from '@/components/View'
import StartupCard from '@/components/StartupCard'
import { StartupTypeCard } from '@/components/StartupCard'



export const experimental_ppr = true;

const page = async ({params}: {params : Promise<{id : string}>}) => {

    const id = (await params).id;

    const [postResult, playlistResult] = await Promise.allSettled([
      client.fetch(STARTUP_BY_ID_QUERY, {id}),
      client.fetch(PLAYLIST_BY_SLUG_QUERY, {
        slug : 'editor-picks'}),
    ]);

    if (postResult.status === 'rejected') {
      console.error('Failed to fetch post:', postResult.reason);
      return notFound();
    }

    const post = postResult.value;
    if (!post) return notFound();

    const editorPosts = playlistResult.status === 'fulfilled' ? playlistResult.value.select : [];

  return (
    <>
    <section className="pink_container !min-h-[230px]" >
      <p className="tag">{formatDate(post ?._createdAt)}</p>
      <h1 className="heading">{post.title}</h1>
      <p className="sub-heading !max-w-5xl">{post.description}</p>
    </section>
    <section className='section-container max-w-7xl mx-auto px-5 md:px-10 py-8'>
      <div className="w-full overflow-hidden rounded-xl">
        <img
          src={post.image} 
          alt="thumbnail"
          className='w-full h-auto object-cover hover:scale-105 transition-transform duration-300' 
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post?.author?._id}`}  
            className="flex gap-2 items-center mb-3">
              <Image src={post?.author?.image} alt="avatar" 
              width={64} height={64}  className="rounded-full drop-shadow-lg"/>
              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">PItch Detalis</h3>
         <article
         className='prose max-w-4xl font-work-snas break-all'
         dangerouslySetInnerHTML={{ __html: post?.pitch }}/>
        </div>
      </div>
      <hr className='divider'/>
      
      {editorPosts?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className='text-30-semibold'>Editor's Notes</p>
          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={i} post={post}/>
              ))}
          </ul>
        </div>
        )}

    </section>

    <Suspense fallback={<Skeleton className='view-skeleton'/>}>
      <View id={id}/>
    </Suspense>
    </>
  )
}

export default page