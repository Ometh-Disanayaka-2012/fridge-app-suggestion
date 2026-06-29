import { useState } from "react";

export default function SavedList({ saved, fridgeSet, onBack }) {
  const [expandedId, setExpandedId] = useState(null);

  function toggleExpanded(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="screen">
      <div className="swipe-topbar">
        <button type="button" className="link-btn" onClick={onBack}>
          ← back
        </button>
        <span className="screen-label" style={{ margin: 0 }}>
          tonight's contenders
        </span>
      </div>

      {saved.length === 0 ? (
        <p className="saved-empty">
          Nothing saved yet — heart a recipe while swiping to add it here.
        </p>
      ) : (
        <ul className="saved-list">
          {saved.map((r) => {
            const isOpen = expandedId === r.id;
            const allIngredients = [...r.need, ...r.bonus];

            return (
              <li className={isOpen ? "saved-item saved-item-open" : "saved-item"} key={r.id}>
                <button
                  type="button"
                  className="saved-item-toggle"
                  onClick={() => toggleExpanded(r.id)}
                  aria-expanded={isOpen}
                >
                  <div className="saved-item-main">
                    <p className="saved-item-name">{r.name}</p>
                    <p className="saved-item-meta">{r.time} min</p>
                  </div>
                  <span className={isOpen ? "saved-chevron saved-chevron-open" : "saved-chevron"}>
                    ⌄
                  </span>
                </button>

                {isOpen && (
                  <div className="saved-item-details">
                    <p className="saved-detail-desc">{r.desc}</p>

                    <p className="saved-detail-label">ingredients</p>
                    <div className="ingredient-tags">
                      {allIngredients.map((ing) => {
                        const have = fridgeSet?.has(ing);
                        return (
                          <span
                            key={ing}
                            className={have ? "ing-tag ing-have" : "ing-tag ing-missing"}
                          >
                            {have ? "✓ " : ""}
                            {ing}
                          </span>
                        );
                      })}
                    </div>

                    {r.steps && r.steps.length > 0 && (
                      <>
                        <p className="saved-detail-label">steps</p>
                        <ol className="saved-detail-steps">
                          {r.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}