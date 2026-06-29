import { useState, useRef } from "react";
import RecipeCard from "./RecipeCard";

const SWIPE_THRESHOLD = 90;

export default function SwipeDeck({
  queue,
  current,
  fridgeSet,
  savedCount,
  onSwipe,
  onBack,
  onViewSaved,
}) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const startX = useRef(0);

  const visible = queue.slice(current, current + 3);
  const activeRecipe = queue[current];
  const done = current >= queue.length;

  function handlePointerDown(e) {
    if (done) return;
    setDragging(true);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  }

  function handlePointerMove(e) {
    if (!dragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDragX(clientX - startX.current);
  }

  function finishDrag() {
    if (!dragging) return;
    setDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      commitSwipe(true);
    } else if (dragX < -SWIPE_THRESHOLD) {
      commitSwipe(false);
    } else {
      setDragX(0);
    }
  }

  function commitSwipe(liked) {
    setDragX(liked ? 500 : -500);
    setShowSteps(false);
    setTimeout(() => {
      onSwipe(liked, activeRecipe);
      setDragX(0);
    }, 180);
  }

  if (done) {
    return (
      <div className="screen swipe-screen">
        <div className="swipe-topbar">
          <button type="button" className="link-btn" onClick={onBack}>
            ← edit fridge
          </button>
        </div>
        <div className="deck-finished">
          <p className="deck-finished-title">That's every match</p>
          <p className="deck-finished-sub">
            You saved {savedCount} recipe{savedCount === 1 ? "" : "s"}.
          </p>
          <button type="button" className="btn btn-primary" onClick={onViewSaved}>
            View saved recipes
          </button>
        </div>
      </div>
    );
  }

  const topCardStyle = {
    transform: `translateX(${dragX}px) rotate(${dragX / 22}deg)`,
    transition: dragging ? "none" : "transform 0.25s ease",
  };

  return (
    <div className="screen swipe-screen">
      <div className="swipe-topbar">
        <button type="button" className="link-btn" onClick={onBack}>
          ← edit fridge
        </button>
        <button type="button" className="link-btn" onClick={onViewSaved}>
          {current + 1} of {queue.length} · saved {savedCount}
        </button>
      </div>

      <div
        className="card-stack"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={finishDrag}
      >
        {visible
          .map((recipe, i) => {
            if (i === 0) {
              return (
                <div className="card-drag-layer" style={topCardStyle} key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    fridgeSet={fridgeSet}
                    depth={0}
                    showSteps={showSteps}
                  />
                  {dragX > 30 && <div className="swipe-stamp stamp-like">saved</div>}
                  {dragX < -30 && <div className="swipe-stamp stamp-nope">skip</div>}
                </div>
              );
            }
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                fridgeSet={fridgeSet}
                depth={i}
                showSteps={false}
              />
            );
          })
          .reverse()}
      </div>

      <button
        type="button"
        className="link-btn steps-toggle"
        onClick={() => setShowSteps((v) => !v)}
      >
        {showSteps ? "hide steps" : "show steps"}
      </button>

      <div className="swipe-actions">
        <button
          type="button"
          className="round-btn round-btn-nope"
          aria-label="Skip recipe"
          onClick={() => commitSwipe(false)}
        >
          ✕
        </button>
        <button
          type="button"
          className="round-btn round-btn-like"
          aria-label="Save recipe"
          onClick={() => commitSwipe(true)}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
