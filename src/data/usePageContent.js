import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';

export function usePageRecord(page) {
  const [result, setResult] = useState(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => onValue(
    ref(db, `sitePages/${page}`),
    (snapshot) => setResult({ page, retry, record: snapshot.val(), error: '' }),
    () => setResult({ page, retry, record: null, error: 'Could not load published content.' }),
  ), [page, retry]);

  const current = result?.page === page && result.retry === retry ? result : null;
  return { ...current, loading: !current, reload: () => setRetry((value) => value + 1) };
}

export function decodePageContent(record, defaults) {
  const values = { ...defaults };
  for (const [field, fallback] of Object.entries(defaults)) {
    const value = record?.content?.[field];
    if (typeof value !== 'string') continue;
    if (Array.isArray(fallback)) {
      try {
        const list = JSON.parse(value);
        if (Array.isArray(list)) values[field] = list;
      } catch {
        continue;
      }
    } else {
      values[field] = value;
    }
  }
  return values;
}

export function usePageContent(page, defaults) {
  const { record } = usePageRecord(page);
  return decodePageContent(record, defaults);
}

export function contentList(value) {
  return Array.isArray(value) ? value : [];
}
