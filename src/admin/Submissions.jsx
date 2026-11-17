import { useEffect, useState } from 'react';
import { endBefore, get, limitToLast, onValue, orderByKey, query, ref, set } from 'firebase/database';
import { db } from '../firebase';
import { proofTypes } from '../data/donations';
import { inboxOptions } from './pages';

const pageSize = 20;
const dateTime = new Intl.DateTimeFormat('en-PK', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Karachi',
});


function label(key) {
  const heading = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
  return heading.charAt(0).toUpperCase() + heading.slice(1);
}

function display(value, key) {
  if (key === 'submittedAt' && typeof value === 'number' && Number.isFinite(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) return dateTime.format(date);
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value === '' || value == null ? '—' : String(value);
}

function RecordFields({ record }) {
  return (
    <dl className="admin-record-fields">
      {Object.entries(record).map(([key, value]) => (
        <div key={key} className={value && typeof value === 'object' ? 'admin-record-nested' : ''}>
          <dt>{label(key)}</dt>
          <dd>{value && typeof value === 'object' ? <RecordFields record={value} /> : display(value, key)}</dd>
        </div>
      ))}
    </dl>
  );
}

async function downloadProof(id, filename) {
  const snapshot = await get(ref(db, `donationProofs/${id}`));
  const data = snapshot.val();
  const match = typeof data === 'string' && data.match(/^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match || !proofTypes.includes(match[1])) throw new Error('The attachment is unavailable.');
  const bytes = Uint8Array.from(atob(match[2]), (character) => character.charCodeAt(0));
  const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }[match[1]];
  const name = filename.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9_-]/g, '_') || 'transfer-proof';
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.${extension}`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Submission({ id, record, group }) {
  const [activity, setActivity] = useState('');
  const [error, setError] = useState('');
  const statuses = inboxOptions[group].statuses;
  const name = record.donorInfo?.name || record.name || (record.donorInfo?.anonymous ? 'Anonymous donor' : record.email || 'Submission');
  const status = record.reviewStatus
    || (group === 'donations' && record.verificationStatus === 'verified' ? 'verified' : record.status);
  const selectedStatus = statuses.includes(status) ? status : statuses[0];
  const reference = record.reference || record.donationId || record.transactionId;
  const date = record.submittedAt || record.date;
  const fields = Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'reviewStatus'));

  async function changeStatus(next) {
    setActivity('status');
    setError('');
    try {
      await set(ref(db, `${group}/${id}/reviewStatus`), next);
    } catch {
      setError('Could not save the review status.');
    } finally {
      setActivity('');
    }
  }

  async function download() {
    setActivity('proof');
    setError('');
    try {
      await downloadProof(id, record.paymentProofFileName || 'transfer-proof');
    } catch {
      setError('No downloadable attachment was found for this submission.');
    } finally {
      setActivity('');
    }
  }

  return (
    <details className="admin-item admin-submission">
      <summary>
        <span><strong>{name}</strong>{reference && <small className="d-block text-muted">{reference}</small>}</span>
        <span className="admin-submission-meta">
          {date && <small>{display(date, 'submittedAt')}</small>}
          <span className={`admin-status admin-status-${selectedStatus}`}>{label(selectedStatus)}</span>
        </span>
      </summary>
      <div className="admin-item-body">
        <RecordFields record={fields} />
        <div className="admin-review">
          <label className="admin-field">
            <span>Review status</span>
            <select className="form-select" value={selectedStatus} onChange={(event) => changeStatus(event.target.value)} disabled={Boolean(activity)}>
              {statuses.map((status) => <option key={status} value={status}>{label(status)}</option>)}
            </select>
          </label>
          {group === 'donations' && Object.hasOwn(record, 'bankReference') && record.paymentProofFileName && (
            <button className="btn btn-outline-secondary" type="button" onClick={download} disabled={Boolean(activity)}>
              {activity === 'proof' ? 'Downloading…' : 'Download transfer proof'}
            </button>
          )}
        </div>
        {error && <p className="text-danger mb-0 mt-2" role="alert">{error}</p>}
      </div>
    </details>
  );
}

export function SubmissionInbox({ group }) {
  const [results, setResults] = useState(null);
  const [cursors, setCursors] = useState([]);
  const [retry, setRetry] = useState(0);
  const cursor = cursors.at(-1);
  const result = results?.cursor === cursor && results?.retry === retry ? results : null;

  useEffect(() => {
    const selection = query(ref(db, group), orderByKey(), ...(cursor ? [endBefore(cursor)] : []), limitToLast(pageSize + 1));
    return onValue(selection, (snapshot) => {
      const entries = [];
      snapshot.forEach((item) => { entries.push({ id: item.key, record: item.val() }); });
      entries.reverse();
      setResults({ cursor, retry, more: entries.length > pageSize, entries: entries.slice(0, pageSize) });
    }, () => setResults({ cursor, retry, error: 'Could not load submissions.' }));
  }, [group, cursor, retry]);

  return (
    <section>
      <div className="mb-4">
        <h2>{inboxOptions[group].label}</h2>
        <p className="text-muted mb-0">Select a submission to view its details and update its review status.</p>
      </div>
      {!result && <p role="status">Loading submissions…</p>}
      {result?.error && <div role="alert">{result.error} <button type="button" onClick={() => setRetry((value) => value + 1)} className="btn btn-sm btn-outline-secondary ms-2">Retry</button></div>}
      {result?.entries && (
        <>
          {!result.entries.length && <p className="admin-empty">No submissions on this page.</p>}
          {result.entries.map(({ id, record }) => <Submission key={id} id={id} record={record} group={group} />)}
        </>
      )}
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-secondary btn-sm" type="button" disabled={!cursors.length} onClick={() => setCursors((current) => current.slice(0, -1))}>Newer submissions</button>
        <button className="btn btn-outline-secondary btn-sm" type="button" disabled={!result?.more} onClick={() => setCursors((current) => [...current, result.entries.at(-1).id])}>Older submissions</button>
      </div>
    </section>
  );
}
