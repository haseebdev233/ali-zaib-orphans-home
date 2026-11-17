import './DonationAccounts.css';
import { useState } from 'react';
import BankAccounts from './BankAccounts';
import SiteImage from './SiteImage';
import { contentList } from '../data/usePageContent';

export default function DonationAccounts({ details, heading = 'Bank account details' }) {
  const [copiedField, setCopiedField] = useState('');
  const [copyError, setCopyError] = useState('');

  async function copy(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setCopyError('');
    } catch {
      setCopyError('Could not copy automatically. Select and copy the number manually.');
    }
  }

  return (
    <section aria-labelledby="bank-details">
      <h2 id="bank-details" className="fw-bold mb-2">{heading}</h2>
      <p className="mb-4">Transfer your donation through one of the accounts below.</p>
      <div className="row g-3">
        <BankAccounts accounts={contentList(details.accounts)} onCopy={copy} copiedField={copiedField} columnClassName="col-md-6" />
      </div>
      <details className="wallet-details mt-3">
        <summary className="fw-semibold"><i className="bi bi-phone me-2" aria-hidden="true" /> JazzCash mobile wallet</summary>
        <div className="row align-items-center g-3 mt-1">
          <div className="col-sm">
            <dl className="mb-2">
              <dt>Account title</dt><dd>{details.walletTitle}</dd>
              <dt>JazzCash number</dt><dd>{details.walletNumber}</dd>
              <dt>Till ID</dt><dd>{details.tillId}</dd>
            </dl>
            <p className="mb-2">Dial <strong>*786*10#</strong> and enter the Till ID, or scan the QR code.</p>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => copy(details.tillId, 'JazzCash Till ID')}>
              {copiedField === 'JazzCash Till ID' ? 'Copied' : 'Copy Till ID'}
            </button>
          </div>
          <div className="col-sm-auto"><SiteImage source={details.qrImage} alt="JazzCash payment QR code" className="wallet-qr" loading="lazy" /></div>
        </div>
      </details>
      <div className={copyError ? 'text-danger mt-3' : 'visually-hidden'} role="status">{copyError || (copiedField && `${copiedField} copied`)}</div>
    </section>
  );
}
