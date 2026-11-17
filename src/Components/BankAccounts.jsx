import { bankAccounts } from '../data/bankAccounts';

export default function BankAccounts({ accounts = bankAccounts, onCopy, copiedField, columnClassName = 'mb-4' }) {
  return accounts.map((account) => (
    <div key={account.id} className={columnClassName}>
      <div className="p-4 rounded-3 border bg-white h-100">
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 p-2 rounded bg-primary text-white">
            <i className="bi bi-bank fs-4"></i>
          </div>
          <div>
            <h3 className="bank-account-heading fw-bold mb-0">{account.bank}</h3>
            <small className="text-muted">Bank Account Transfer</small>
          </div>
        </div>
        <div className="mb-3">
          <small className="text-muted">Account Title:</small>
          <div className="fw-bold">{account.title}</div>
        </div>
        <div className="mb-3">
          <small className="text-muted">{account.branchLabel}:</small>
          <div className="fw-bold">{account.branch}</div>
        </div>
        {[
          { key: 'accountNumber', label: 'Account Number', value: account.accountNumber },
          { key: 'iban', label: 'IBAN Number', value: account.iban },
        ].map((field) => {
          const fieldId = `${account.bank} ${field.label}`;
          const copied = copiedField === fieldId;

          return (
            <div key={field.key} className="mb-3">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                <small className="text-muted">{field.label}:</small>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  aria-label={`Copy ${account.bank} ${field.label}`}
                  onClick={() => onCopy(field.value, fieldId)}
                >
                  <i className={`bi ${copied ? 'bi-check' : 'bi-copy'} me-1`}></i>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="fw-bold text-break">{field.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  ));
}
