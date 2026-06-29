import { matchLabel } from "../data/recipes";

const TAG_LABELS = {
  quick: "quick",
  comfort: "comfort food",
  hearty: "hearty",
  light: "light",
};

export default function RecipeCard({ recipe, fridgeSet, depth, showSteps }) {
  const label = matchLabel(recipe.match);
  const allIngredients = [...recipe.need, ...recipe.bonus];

  const style = {
    transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.035})`,
    zIndex: 10 - depth,
    opacity: depth > 2 ? 0 : 1,
  };

  return (
    <div className={`recipe-card depth-${depth}`} style={style}>
      <div className="recipe-card-hole" aria-hidden="true" />

      <div className={`recipe-badge badge-${label.level}`}>{label.text}</div>

      <div className="recipe-card-head">
        <h3 className="recipe-name">{recipe.name}</h3>
        <div className="recipe-meta">
          <span className="recipe-time">{recipe.time} min</span>
          <span className="recipe-tag">{TAG_LABELS[recipe.tag] || recipe.tag}</span>
        </div>
      </div>

      <p className="recipe-desc">{recipe.desc}</p>

      <div className="recipe-ingredients">
        <p className="recipe-ingredients-label">ingredients</p>
        <div className="ingredient-tags">
          {allIngredients.map((ing) => {
            const have = fridgeSet.has(ing);
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
      </div>

      {showSteps && (
        <ol className="recipe-steps">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
