export default function EmptyState({ onBack }) {
  return (
    <div className="screen empty-state">
      <p className="empty-title">No matches yet</p>
      <p className="empty-sub">
        Try adding a few more staples — rice, eggs, or garlic unlock the most
        recipes.
      </p>
      <button type="button" className="btn btn-secondary" onClick={onBack}>
        Edit fridge
      </button>
    </div>
  );
}
