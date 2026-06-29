import { useState } from "react";
import { QUICK_ADD } from "../data/recipes";

export default function FridgeInput({ fridge, setFridge, onFindRecipes }) {
  const [draft, setDraft] = useState("");

  function addIngredient(value) {
    const cleaned = value.trim().toLowerCase();
    if (cleaned && !fridge.includes(cleaned)) {
      setFridge((prev) => [...prev, cleaned]);
    }
    setDraft("");
  }

  function removeIngredient(index) {
    setFridge((prev) => prev.filter((_, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(draft);
    }
  }

  return (
    <div className="screen">
      <p className="screen-label">What's in your fridge?</p>

      <div className="chip-row">
        {fridge.map((ing, i) => (
          <span className="chip chip-filled" key={ing}>
            {ing}
            <button
              type="button"
              className="chip-remove"
              aria-label={`Remove ${ing}`}
              onClick={() => removeIngredient(i)}
            >
              ×
            </button>
          </span>
        ))}
        {fridge.length === 0 && (
          <span className="chip-placeholder">no ingredients added yet</span>
        )}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type an ingredient and press enter"
          className="text-input"
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => addIngredient(draft)}
        >
          Add
        </button>
      </div>

      <div className="quick-add-row">
        <span className="quick-add-label">quick add</span>
        {QUICK_ADD.map((item) => (
          <button
            type="button"
            key={item}
            className="chip chip-quick"
            onClick={() => addIngredient(item)}
            disabled={fridge.includes(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-primary btn-full"
        onClick={onFindRecipes}
        disabled={fridge.length === 0}
      >
        Find recipes
      </button>
    </div>
  );
}
