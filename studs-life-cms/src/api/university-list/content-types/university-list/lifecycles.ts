import fs from 'fs/promises';
import path from 'path';
import { parseUniversityDocx } from '../../utils/docx-parser';

declare const strapi: any;

const UID = 'api::university-list.university-list';
const activeSyncs = new Set<string>();

function getMediaFile(entry: any) {
  const media = entry?.sourceDocument;
  if (Array.isArray(media)) return media[0];
  return media;
}

function getDocumentSignature(file: any): string {
  return [
    file?.hash,
    file?.ext,
    file?.size,
    file?.updatedAt,
    file?.url,
  ].filter(Boolean).join(':');
}

async function readMediaBuffer(strapi: any, file: any): Promise<Buffer> {
  if (!file?.url) {
    throw new Error('No source document URL found');
  }

  if (file.url.startsWith('/')) {
    const publicDir = strapi.dirs?.static?.public || path.join(process.cwd(), 'public');
    const localPath = path.join(publicDir, file.url.replace(/^\/+/, ''));
    return fs.readFile(localPath);
  }

  const response = await fetch(file.url);
  if (!response.ok) {
    throw new Error(`Cannot download source document: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function syncUniversityList(strapi: any, result: any) {
  const documentId = result?.documentId;
  if (!documentId || activeSyncs.has(documentId)) return;

  activeSyncs.add(documentId);

  try {
    const entry = await strapi.documents(UID).findOne({
      documentId,
      populate: ['sourceDocument'],
    });

    if (!entry?.autoParse) return;

    const file = getMediaFile(entry);
    if (!file) return;

    const signature = getDocumentSignature(file);
    if (signature && entry.documentSignature === signature && entry.entries?.countries?.length) {
      return;
    }

    const buffer = await readMediaBuffer(strapi, file);
    const parsed = await parseUniversityDocx(buffer);

    await strapi.documents(UID).update({
      documentId,
      data: {
        entries: {
          title: parsed.title,
          countries: parsed.countries,
          totalCountries: parsed.totalCountries,
          totalUniversities: parsed.totalUniversities,
          parser: 'docx-university-list-v1',
        },
        totalCountries: parsed.totalCountries,
        totalUniversities: parsed.totalUniversities,
        parseStatus: 'parsed',
        parseMessage: `Parsed ${parsed.totalUniversities} universities in ${parsed.totalCountries} countries`,
        documentSignature: signature,
      },
    });
  } catch (error: any) {
    await strapi.documents(UID).update({
      documentId,
      data: {
        parseStatus: 'error',
        parseMessage: error?.message || 'Failed to parse DOCX',
      },
    });
  } finally {
    activeSyncs.delete(documentId);
  }
}

export default {
  async afterCreate(event: any) {
    await syncUniversityList(strapi, event.result);
  },
  async afterUpdate(event: any) {
    await syncUniversityList(strapi, event.result);
  },
};
