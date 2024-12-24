import "server-only";

import { createClient } from 'next-sanity'

import {  dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-12-22',
  useCdn: false,
  token,
   // Set to false if statically generating pages, using ISR or tag-based revalidation
});

if(!writeClient.config().token) 
throw new Error('writeClient is not defined');
