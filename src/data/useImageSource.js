import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { db } from '../firebase';

const images = new Map();

function loadImage(id) {
  if (!images.has(id)) {
    images.set(id, get(ref(db, `siteMedia/${id}`)).then((snapshot) => {
      const value = snapshot.child('image').val();
      if (typeof value !== 'string' || !value.startsWith('data:image/webp;base64,')) {
        throw new Error('Image unavailable');
      }
      return value;
    }).catch((error) => {
      images.delete(id);
      throw error;
    }));
  }
  return images.get(id);
}

export function useImageSource(source, fallback) {
  const id = typeof source === 'string' && source.startsWith('media:') ? source.slice(6) : '';
  const [resolved, setResolved] = useState(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    loadImage(id).then((url) => {
      if (active) setResolved({ id, url });
    }).catch(() => {});
    return () => { active = false; };
  }, [id]);

  return id ? (resolved?.id === id ? resolved.url : fallback) : source;
}
