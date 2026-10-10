import { useState } from 'react';

export default function PasswordRecovery({ apiUrl, portal, initialEmail, onClose }) {
  const [email, setEmail] = useState(initialEmail || '');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resendAt, setResendAt] = useState(0);
  const request = async (action, body) => {
    const response = await fetch(`${apiUrl}/${portal}/auth/${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Unable to complete password recovery.');
    return result;
  };
  const send = async () => {
    if (Date.now() < resendAt) { setError('Please wait one minute before requesting another code.'); return; }
    setBusy(true); setError(''); setMessage('');
    try { const result = await request('forgot-password', { email }); setSent(true); setOtp(''); setMessage(result.message); setResendAt(Date.now() + 60000); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!sent) return send();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setBusy(true); setError(''); setMessage('');
    try { const result = await request('reset-password', { email, otp, password }); setDone(true); setPassword(''); setConfirm(''); setOtp(''); setMessage(result.message); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <form onSubmit={submit} className="kr-password-recovery">
    <h1>Reset password</h1>
    {!done && <><p>Receive a six-digit code at your registered email address. Codes expire after 10 minutes.</p>
      <label>Email<input type="email" required autoComplete="email" value={email} disabled={sent || busy} onChange={(event) => setEmail(event.target.value)} /></label>
      {sent && <><label>Email verification code<input required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} disabled={busy} /></label>
        <label>New password<input type="password" required minLength={10} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} /></label>
        <p>Use at least 10 characters, including uppercase, lowercase, a number and a special character.</p>
        <label>Confirm password<input type="password" required autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} disabled={busy} /></label></>}
    </>}
    {message && <p role="status">{message}</p>}{error && <p role="alert">{error}</p>}
    {!done && <button disabled={busy}>{busy ? 'Please wait…' : sent ? 'Set new password' : 'Send email code'}</button>}
    {sent && !done && <button type="button" className="kr-recovery-link" disabled={busy} onClick={send}>Resend code</button>}
    <button type="button" className="kr-recovery-link" disabled={busy} onClick={onClose}>Back to sign in</button>
  </form>;
}
