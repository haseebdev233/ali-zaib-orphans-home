import { push, ref, update } from 'firebase/database';
import { db } from '../firebase';

const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
export const imageAccept = imageTypes.join(',');

export async function prepareSiteImage(file) {
  if (!imageTypes.includes(file.type) || !file.size || file.size > 10 * 1024 * 1024) {
    throw new Error('Choose a JPG, PNG or WebP image up to 10 MB.');
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    for (const quality of [0.85, 0.7, 0.55, 0.4]) {
      const url = canvas.toDataURL('image/webp', quality);
      if (url.startsWith('data:image/webp;base64,') && url.length <= 600000) return url;
    }
    throw new Error('Choose a smaller image.');
  } catch (error) {
    throw new Error(error.message === 'Choose a smaller image.' ? error.message : 'This image could not be opened.');
  } finally {
    bitmap?.close();
  }
}

export function createMediaId() {
  return push(ref(db, 'siteMedia')).key;
}

function mediaIds(value) {
  if (typeof value === "string") {
    const match = value.match(/^media:([a-zA-Z0-9_-]{20})$/);
    return match ? [match[1]] : [];
  }
  return value && typeof value === "object" ? Object.values(value).flatMap(mediaIds) : [];
}

export async function publishPage(page, record, values, defaults, pendingMedia) {
  const content = {};
  for (const [key, value] of Object.entries(values)) {
    if (JSON.stringify(value) === JSON.stringify(defaults[key])) continue;
    content[key] = typeof value === 'string' ? value : JSON.stringify(value);
  }

  const images = Object.fromEntries(mediaIds(values).map((id) => [id, true]));
  const writes = { [`sitePages/${page}`]: { revision: (record?.revision || 0) + 1, content, images } };
  let mediaSize = 0;
  for (const id of Object.keys(images)) {
    const image = pendingMedia.get(id);
    if (!image) continue;
    mediaSize += image.length;
    writes[`siteMedia/${id}`] = { page, image };
  }
  for (const id of Object.keys(record?.images || {})) {
    if (!images[id]) writes[`siteMedia/${id}`] = null;
  }
  if (mediaSize > 12 * 1024 * 1024) throw new Error('Publish these images in smaller batches.');

  await update(ref(db), writes);
}
