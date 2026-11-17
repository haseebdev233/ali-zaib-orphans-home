import { useRef, useState } from 'react';
import { push, ref } from 'firebase/database';
import { Link, useLocation } from 'react-router-dom';
import DonationAccounts from '../Components/DonationAccounts';
import { db, useEmulators } from '../firebase';
import { useDonationDetails } from '../data/useDonationDetails';
import { contentList } from '../data/usePageContent';
import { proofTypes, readProof, recordDonation } from '../data/donations';
import './Donate.css';

const amounts = [500, 1000, 2500, 5000, 10000];
const currency = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 });

function downloadAcknowledgement(receipt) {
  const text = [
    'ALI ZAIB ORPHAN HOME',
    'Donation submission acknowledgement',
    '',
    `Reference: ${receipt.reference}`,
    `Amount: PKR ${currency.format(receipt.amount)}`,
    `Purpose: ${receipt.purpose}`,
    'Status: Awaiting review by Ali Zaib Orphan Home.',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${receipt.reference}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DonationForm({ details, selection }) {
  const prefilledAmount = selection?.sponsorAmount ?? selection?.zakatAmount ?? selection?.aqiqaAmount ?? selection?.selectedAmount;
  const prefilledPurpose = selection?.sponsorName || (selection?.aqiqaAmount ? 'Aqeeqa' : '');
  const [amount, setAmount] = useState(prefilledAmount ? String(prefilledAmount) : '');
  const [purpose, setPurpose] = useState(prefilledPurpose ? 'other' : selection?.zakatAmount ? 'zakat' : 'donation');
  const [proof, setProof] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const submissionId = useRef(null);
  const submitting = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;

    const form = new FormData(event.currentTarget);
    const name = form.get('name').trim();
    const email = form.get('email').trim();
    const phone = form.get('phone').trim();
    const bankReference = form.get('bankReference').trim();
    const accountId = form.get('paymentMethod');
    const account = contentList(details.accounts).find((item) => item.id === accountId);
    const paymentMethod = accountId === 'jazzcash' ? 'JazzCash' : account?.bank;
    const value = Number(amount);
    const displayType = purpose === 'other' ? form.get('customPurpose').trim() : ({
      donation: 'General donation', zakat: 'Zakat', sadaqah: 'Sadaqah', khairat: 'Khairat',
    })[purpose];

    if (!form.has('anonymous') && !name) {
      setError('Enter your name or select Give anonymously.');
      return;
    }
    if (!displayType) {
      setError('Enter the purpose of your donation.');
      return;
    }
    if (!email && !phone) {
      setError('Enter an email address or phone number so our team can follow up.');
      return;
    }
    if (!paymentMethod) {
      setError('Select the bank account or mobile wallet you used.');
      return;
    }
    if (!bankReference && !proof) {
      setError('Enter the transfer reference from your bank or attach proof of payment.');
      return;
    }

    submitting.current = true;
    setBusy(true);
    setError('');
    try {
      const attachment = proof && {
        name: proof.name.slice(0, 180),
        size: proof.size,
        type: proof.type,
        dataUrl: await readProof(proof),
      };
      submissionId.current ||= push(ref(db, 'donations')).key;
      const donation = {
        amount: value,
        selectedType: purpose === 'other' ? displayType : purpose,
        displayType,
        paymentMethod,
        paymentAccountId: accountId,
        bankReference,
        donorInfo: { name, email, phone, message: form.get('message').trim(), anonymous: form.has('anonymous') },
      };
      const reference = await recordDonation(donation, attachment, submissionId.current);
      if (!useEmulators) {
        void import('../data/donationNotification').then(({ notifyDonationStaff }) =>
          notifyDonationStaff(donation, reference, attachment?.name),
        ).catch(() => {});
      }
      setReceipt({ reference, amount: value, purpose: displayType });
    } catch (failure) {
      setError(failure.code ? 'Could not save your donation details. Please try again using the same transfer information.' : failure.message);
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <section className="donate-form" id="report-transfer" aria-labelledby="transfer-heading">
      <h2 id="transfer-heading">Report your transfer</h2>
      {receipt ? (
        <div role="status" className="donate-confirmation">
          <i className="bi bi-check-circle me-2" aria-hidden="true" />
          <strong>Transfer details received</strong>
          <p>Keep reference <strong className="text-break">{receipt.reference}</strong> for your records. Our team will review your submission.</p>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn donate-primary" type="button" onClick={() => downloadAcknowledgement(receipt)}>Download acknowledgement</button>
            <a className="btn btn-outline-primary" href={`https://wa.me/923219920015?text=${encodeURIComponent("Assalam-o-Alaikum. I submitted a donation transfer to Ali Zaib Orphan Home. My submission reference is " + receipt.reference + ".")}`} target="_blank" rel="noopener noreferrer">Follow up on WhatsApp</a>
          </div>
        </div>
      ) : (
        <>
          <p>After making your payment, share your transfer details so our team can match your donation.</p>
          <form onSubmit={submit}>
            <fieldset disabled={busy}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="donation-amount" className="form-label">Amount in PKR</label>
                  <input id="donation-amount" className="form-control" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} min="1" max="1000000000" step=".01" required />
                  <div className="donate-presets" aria-label="Suggested amounts">
                    {amounts.map((value) => (
                      <button key={value} type="button" className="btn btn-sm" aria-pressed={Number(amount) === value} onClick={() => setAmount(String(value))}>{currency.format(value)}</button>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="donation-purpose" className="form-label">Donation purpose</label>
                  <select id="donation-purpose" className="form-select" value={purpose} onChange={(event) => setPurpose(event.target.value)}>
                    <option value="donation">General donation</option><option value="zakat">Zakat</option>
                    <option value="sadaqah">Sadaqah</option><option value="khairat">Khairat</option><option value="other">Other / sponsorship</option>
                  </select>
                  {purpose === 'other' && (
                    <label className="form-label d-block mt-2">Specify purpose
                      <input className="form-control" name="customPurpose" defaultValue={prefilledPurpose} maxLength="200" required />
                    </label>
                  )}
                </div>
                <label className="col-md-6 form-label mb-0">Paid through
                  <select className="form-select" name="paymentMethod" defaultValue="" required>
                    <option value="" disabled>Select an account</option>
                    {contentList(details.accounts).map((account) => <option key={account.id} value={account.id}>{account.bank} · {account.title} · {account.accountNumber.slice(-4)}</option>)}
                    <option value="jazzcash">JazzCash</option>
                  </select>
                </label>
                <label className="col-md-6 form-label mb-0">Bank or JazzCash transfer reference
                  <input className="form-control" name="bankReference" maxLength="120" />
                </label>
                <label className="col-12 form-label mb-0">Proof of payment <span className="fw-normal">(optional if you enter a transfer reference)</span>
                  <input className="form-control" type="file" accept={proofTypes.join(',')} onChange={(event) => setProof(event.target.files[0] || null)} aria-describedby="proof-help" />
                  <small className="form-text" id="proof-help">JPG, PNG, WebP or PDF up to 2 MB.</small>
                </label>
                <hr className="mt-4 mb-1" />
                <label className="col-12 form-label mb-0">Full name
                  <input className="form-control" name="name" autoComplete="name" maxLength="120" />
                </label>
                <label className="col-md-6 form-label mb-0">Email
                  <input className="form-control" name="email" type="email" autoComplete="email" maxLength="254" />
                </label>
                <label className="col-md-6 form-label mb-0">Phone
                  <input className="form-control" name="phone" type="tel" autoComplete="tel" maxLength="40" />
                </label>
                <label className="col-12 form-label mb-0">Note <span className="fw-normal">(optional)</span>
                  <textarea className="form-control" name="message" rows="2" maxLength="1500" />
                </label>
                <label className="col-12 d-flex align-items-center gap-2">
                  <input className="form-check-input mt-0" type="checkbox" name="anonymous" /> Give anonymously
                </label>
              </div>
              {error && <p className="donate-error mt-3 mb-0" role="alert">{error}</p>}
              <button className="btn donate-primary mt-4" type="submit">{busy ? 'Submitting…' : 'Submit transfer details'}</button>
            </fieldset>
          </form>
        </>
      )}
      <p className="donate-help mb-0 mt-4">Need help completing your donation? <Link to="/contact">Contact us</Link>.</p>
    </section>
  );
}

export default function Donate() {
  const location = useLocation();
  const details = useDonationDetails();
  return (
    <main className="donate-page">
      <header className="donate-header">
        <div className="donate-container">
          <h1>{details.title}</h1>
          <p>{details.intro}</p>
        </div>
      </header>
      <div className="donate-container donate-body">
        <DonationAccounts details={details} />
        <DonationForm key={location.key} details={details} selection={location.state} />
      </div>
    </main>
  );
}
