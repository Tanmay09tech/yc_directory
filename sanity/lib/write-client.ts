import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token} from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to get data in real time while fetching
  token,
});

if(!writeClient.config().token){
throw new Error("Write token not found");
}
