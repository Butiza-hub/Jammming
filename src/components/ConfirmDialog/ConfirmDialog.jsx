import './ConfirmDialog.css';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="ConfirmDialog-overlay">
      <div className="ConfirmDialog-box">
        <p>{message}</p>
        <div className="ConfirmDialog-actions">
          <button className="ConfirmDialog-yes" onClick={onConfirm}>Yes</button>
          <button className="ConfirmDialog-no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;