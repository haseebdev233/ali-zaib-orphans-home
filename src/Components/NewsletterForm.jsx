import { useRef, useState } from 'react';
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { db } from '../firebase';

export default function NewsletterForm() {
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);

  async function subscribe(event) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const email = new FormData(form).get('email').trim().toLowerCase();
    submitting.current = true;
    setBusy(true);
    setFeedback(null);
    try {
      await set(push(ref(db, 'newsletter-subscribers')), { email, status: 'subscribed', submittedAt: serverTimestamp() });
      form.reset();
      setFeedback({ text: 'Thanks for subscribing.' });
    } catch {
      setFeedback({ error: true, text: 'Could not save your subscription. Please try again.' });
    } finally {
      setBusy(false);
      submitting.current = false;
    }
  }

  return (
    <form className="mb-4" onSubmit={subscribe} aria-label="Newsletter signup">
      <fieldset disabled={busy}>
        <div className="input-group">
          <input type="email" name="email" className="form-control" placeholder="Enter your email" aria-label="Newsletter email" autoComplete="email" maxLength="254" required />
          <button className="btn btn-success" type="submit" aria-label="Subscribe to the newsletter">
            <i className={busy ? 'bi bi-hourglass-split' : 'bi bi-send'} aria-hidden="true" />
          </button>
        </div>
      </fieldset>
      {feedback && <p className={`small mt-2 mb-0 ${feedback.error ? 'text-warning' : 'text-white'}`} role="status">{feedback.text}</p>}
    </form>
  );
}
