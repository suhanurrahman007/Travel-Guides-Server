import { MeiliSearch } from 'meilisearch';
import config from '../config';
import { Document, Types } from 'mongoose';
import { TPost } from '../modules/Post/post.interface';
import { noImage } from '../modules/Post/post.constant';



export const meiliClient = new MeiliSearch({
  host: config.meilisearch_host as string,
  apiKey: config.meilisearch_master_key,
});

export async function addDocumentToIndex(
  result: Document<unknown, object, TPost> & TPost & { _id: Types.ObjectId },
  indexKey: string
) {
  const index = meiliClient.index(indexKey);

  const { _id, title, content, images } = result;
  const firstImage = images?.[0] || noImage;

  const document = {
    id: _id.toString(), // Ensure the ID is a string
    title,
    content,
    thumbnail: firstImage,
  };

  try {
    await index.addDocuments([document]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding document to MeiliSearch:', error);
  }
}

export const deleteDocumentFromIndex = async (indexKey: string, id: string) => {
  const index = meiliClient.index(indexKey);

  try {
    await index.deleteDocument(id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting resource from MeiliSearch:', error);
  }
};


