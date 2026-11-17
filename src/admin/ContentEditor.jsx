import { useRef, useState } from 'react';
import SiteImage from '../Components/SiteImage';
import { decodePageContent, usePageRecord } from '../data/usePageContent';
import { createMediaId, imageAccept, prepareSiteImage, publishPage } from './publishing';

function ImageField({ field, value, onChange, pending, setPreparing, onError }) {
  async function choose(event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;

    setPreparing((count) => count + 1);
    onError('');
    try {
      const image = await prepareSiteImage(file);
      const id = createMediaId();
      pending.set(id, image);
      onChange(`media:${id}`);
    } catch (error) {
      onError(error.message);
    } finally {
      setPreparing((count) => count - 1);
    }
  }

  const preview = value && pending.get(value.slice(6)) || value;
  return (
    <div className="admin-image-field">
      {preview && <SiteImage source={preview} alt="" className="admin-image-preview" loading="lazy" />}
      <label className="admin-field">
        <span>{field.label}</span>
        <input className="form-control form-control-sm" type="file" accept={imageAccept} onChange={choose} />
      </label>
      {field.required && !value && <small className="text-muted">Choose an image before publishing.</small>}
    </div>
  );
}

function ListEditor({ field, value, onChange, tools }) {
  const items = Array.isArray(value) ? value : [];
  function move(index, offset) {
    const next = [...items];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    onChange(next);
  }

  function add() {
    onChange([...items, { id: createMediaId(), ...field.initial }]);
  }

  return (
    <section className="admin-list">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <h3>{field.label}</h3>
        <button type="button" className="btn btn-sm btn-outline-success" onClick={add}>Add {field.itemLabel}</button>
      </div>
      {items.length === 0 && <p className="text-muted mb-1">No items added.</p>}
      {items.map((item, index) => (
        <details key={item.id} className="admin-item">
          <summary>{item.bank || item.title || item.name || item.label || item.alt || `${field.itemLabel} ${index + 1}`}</summary>
          <div className="admin-item-body">
            <EditorFields
              fields={field.fields}
              values={item}
              onChange={(key, updated) => onChange(items.map((row) => row.id === item.id ? { ...row, [key]: updated } : row))}
              tools={tools}
            />
            <div className="d-flex flex-wrap gap-2 mt-3">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => move(index, -1)} disabled={index === 0}>Move up</button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => move(index, 1)} disabled={index === items.length - 1}>Move down</button>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onChange(items.filter((row) => row.id !== item.id))} disabled={items.length <= (field.min || 0)}>Remove</button>
            </div>
          </div>
        </details>
      ))}
    </section>
  );
}

function EditorFields({ fields, values, onChange, tools }) {
  return fields.filter((field) => !field.show || field.show(values)).map((field) => {
    const value = values[field.key] ?? '';
    const change = (updated) => onChange(field.key, updated);
    const inputProps = {
      className: 'form-control',
      value,
      required: field.required,
      maxLength: field.max || 300,
      onChange: (event) => change(event.target.value),
    };

    if (field.type === 'image') {
      return <ImageField key={field.key} field={field} value={value} onChange={change} {...tools} />;
    }
    if (field.type === 'list') {
      return <ListEditor key={field.key} field={field} value={value} onChange={change} tools={tools} />;
    }
    return (
      <label className="admin-field" key={field.key}>
        <span>{field.label}</span>
        {field.type === 'textarea' ? <textarea {...inputProps} rows={field.rows || 4} />
          : field.type === 'select' ? (
            <select {...inputProps} className="form-select">
              {field.options.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          ) : <input {...inputProps} type={field.type || 'text'} min={field.min} max={field.numberMax} />}
      </label>
    );
  });
}

function missingField(fields, values) {
  for (const field of fields) {
    if (field.show && !field.show(values)) continue;
    const value = values[field.key];
    if (field.required && !String(value ?? '').trim()) return field.label;
    if (field.type === 'number' && (!Number.isInteger(Number(value)) || Number(value) < field.min || Number(value) > field.numberMax)) {
      return field.label + ' (' + field.min + ' to ' + field.numberMax + ')';
    }
    if (field.type === 'url' && !String(value).startsWith('https://')) return field.label + ' (HTTPS URL)';
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return field.label + ' (valid email address)';
    if (field.type === 'list') {
      for (const row of value || []) {
        const missing = missingField(field.fields, row);
        if (missing) return `${field.label} / ${missing}`;
      }
    }
  }
  return '';
}

export default function ContentEditor({ page, definition }) {
  const { record, error: loadError, loading, reload } = usePageRecord(page);
  const [draft, setDraft] = useState(null);
  const pending = useRef(new Map());
  const [preparing, setPreparing] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const revision = record?.revision ?? 0;
  const values = draft?.values ?? decodePageContent(record, definition.defaults);
  const changedElsewhere = draft && draft.revision !== revision;

  function change(key, value) {
    setNotice('');
    setDraft((current) => ({
      revision: current?.revision ?? revision,
      values: { ...(current?.values || values), [key]: value },
    }));
  }

  function discard() {
    setDraft(null);
    pending.current.clear();
    setError('');
    setNotice('');
  }

  async function publish(event) {
    event.preventDefault();
    if (busy || preparing || !draft || changedElsewhere) return;

    const missing = missingField(definition.fields, values);
    if (missing) {
      setError(`Enter a value for ${missing}.`);
      return;
    }

    setBusy(true);
    setError('');
    try {
      await publishPage(page, record, values, definition.defaults, pending.current);
      discard();
      setNotice('Published. Your changes are live.');
    } catch (failure) {
      setError(failure.code ? 'Publishing failed. Check your connection and access, then try again.' : failure.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p role="status">Loading page content…</p>;
  if (loadError) return <div role="alert">{loadError} <button type="button" onClick={reload} className="btn btn-outline-secondary btn-sm ms-2">Retry</button></div>;

  return (
    <form noValidate onSubmit={publish} className="admin-page-editor">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2>{definition.label}</h2>
          <p className="text-muted mb-0">Publish to update the public page.</p>
        </div>
        <a className="btn btn-outline-secondary" href={page === 'home' ? '/' : `/${page}`} target="_blank" rel="noreferrer">View public page <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
      <fieldset disabled={busy || Boolean(preparing)}>
        <EditorFields fields={definition.fields} values={values} onChange={change} tools={{ pending: pending.current, setPreparing, onError: setError }} />
      </fieldset>
      <div className="admin-publish">
        {changedElsewhere && !busy && <p className="text-danger mb-2" role="alert">A newer version is available. Discard this draft to edit the latest version.</p>}
        {error && <p className="text-danger mb-2" role="alert">{error}</p>}
        {notice && <p className="text-success mb-2" role="status">{notice}</p>}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button type="submit" className="btn btn-success" disabled={!draft || busy || Boolean(preparing) || changedElsewhere}>{busy ? 'Publishing…' : 'Publish changes'}</button>
          <button type="button" className="btn btn-outline-secondary" disabled={!draft || busy || Boolean(preparing)} onClick={discard}>Discard draft</button>
          {preparing > 0 && <small role="status">Preparing image…</small>}
        </div>
      </div>
    </form>
  );
}
