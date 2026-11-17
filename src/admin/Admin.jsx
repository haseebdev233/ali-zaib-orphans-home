import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { auth } from './auth';
import ContentEditor from './ContentEditor';
import { inboxOptions, pages } from './pages';
import { SubmissionInbox } from './Submissions';
import './Admin.css';

function useAdminSession() {
  const [session, setSession] = useState({ loading: true });

  useEffect(() => {
    let stopAccess;
    const stopAuth = onAuthStateChanged(auth, (user) => {
      stopAccess?.();
      if (!user) {
        setSession({ user: null, loading: false });
        return;
      }
      setSession({ user, loading: true });
      stopAccess = onValue(ref(db, `adminUids/${user.uid}`), (snapshot) => {
        setSession({ user, allowed: snapshot.val() === true, loading: false });
      }, () => setSession({ user, error: 'Could not check admin access.', loading: false }));
    });
    return () => { stopAuth(); stopAccess?.(); };
  }, []);

  return session;
}

function SignIn() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;

    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, fields.get('email').trim(), fields.get('password'));
    } catch (failure) {
      if (failure.code === 'auth/operation-not-allowed') setError('Email sign-in needs to be enabled in Firebase.');
      else if (failure.code === 'auth/network-request-failed') setError('Could not reach Firebase. Check your internet connection and try again.');
      else setError('Sign-in failed. Check your email and password and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-login">
      <h1>Staff sign-in</h1>
      <form onSubmit={submit}>
        <fieldset disabled={busy}>
          <label className="admin-field"><span>Email</span><input className="form-control" type="email" name="email" autoComplete="username" required /></label>
          <label className="admin-field"><span>Password</span><input className="form-control" type="password" name="password" autoComplete="current-password" required /></label>
          {error && <p className="text-danger" role="alert">{error}</p>}
          <button className="btn btn-success w-100" type="submit">{busy ? 'Signing in…' : 'Sign in'}</button>
        </fieldset>
      </form>
    </section>
  );
}

function Dashboard() {
  const [params] = useSearchParams();
  const page = params.get('page');
  const inbox = params.get('inbox');
  const activeInbox = Object.hasOwn(inboxOptions, inbox) ? inbox : null;
  const activePage = Object.hasOwn(pages, page) ? page : 'home';

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <nav aria-label="Admin navigation">
          <h2>Form submissions</h2>
          {Object.entries(inboxOptions).map(([key, option]) => (
            <Link key={key} to={`/admin?inbox=${key}`} aria-current={activeInbox === key ? 'page' : undefined}>{option.label}</Link>
          ))}
          <h2>Website pages</h2>
          {Object.entries(pages).map(([key, option]) => (
            <Link key={key} to={`/admin?page=${key}`} aria-current={!activeInbox && activePage === key ? 'page' : undefined}>{option.label}</Link>
          ))}
        </nav>
      </aside>
      <article className="admin-workspace">
        {activeInbox
          ? <SubmissionInbox key={activeInbox} group={activeInbox} />
          : <ContentEditor key={activePage} page={activePage} definition={pages[activePage]} />}
      </article>
    </div>
  );
}

export default function Admin() {
  const session = useAdminSession();
  const [error, setError] = useState('');
  async function logOut() {
    setError('');
    try { await signOut(auth); } catch { setError('Could not sign out. Try again.'); }
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link to="/">Ali Zaib Orphan Home</Link>
          <span>Website administration</span>
        </div>
        {session.user && <button className="btn btn-outline-light btn-sm" type="button" onClick={logOut}>Sign out</button>}
      </header>
      {error && <p className="alert alert-danger mx-3 mt-3" role="alert">{error}</p>}
      {session.loading ? <p className="admin-login" role="status">Checking access…</p>
        : !session.user ? <SignIn />
          : session.allowed ? <Dashboard key={session.user.uid} />
            : <section className="admin-login"><h1>Admin access required</h1><p className="mb-0" role="alert">{session.error || 'This account does not have access to the admin panel.'}</p></section>}
    </main>
  );
}
