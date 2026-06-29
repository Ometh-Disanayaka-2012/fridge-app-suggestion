// Recipe icon keys map to emoji-free glyphs rendered in RecipeCard.
// "need" = core ingredients required for the dish to make sense.
// "bonus" = ingredients that improve the match score but aren't essential.

export const RECIPES = [
  {
    id: 1,
    name: "Garlic butter rice with fried eggs",
    time: 15,
    need: ["rice", "eggs", "garlic"],
    bonus: ["butter", "onion"],
    tag: "comfort",
    desc: "Toast garlic in butter, fold into hot rice, top with a crispy fried egg.",
    steps: [
      "Cook rice and set aside.",
      "Melt butter in a pan, sauté minced garlic until golden.",
      "Fold rice through the garlic butter.",
      "Fry eggs separately and place on top to serve.",
    ],
  },
  {
    id: 2,
    name: "One-pan tomato garlic chicken",
    time: 30,
    need: ["chicken", "tomato", "garlic"],
    bonus: ["onion", "cheese"],
    tag: "hearty",
    desc: "Sear chicken, simmer in crushed tomato and garlic until thick and saucy.",
    steps: [
      "Season and sear chicken pieces until browned.",
      "Add chopped garlic and onion, cook until fragrant.",
      "Pour in crushed tomato, simmer 15 minutes.",
      "Finish with grated cheese if using.",
    ],
  },
  {
    id: 3,
    name: "Cheesy onion pasta bake",
    time: 35,
    need: ["pasta", "cheese", "onion"],
    bonus: ["garlic", "tomato"],
    tag: "comfort",
    desc: "Caramelized onions, melted cheese, baked pasta until golden on top.",
    steps: [
      "Boil pasta until just shy of al dente.",
      "Caramelize sliced onions slowly in a pan.",
      "Combine pasta, onions, and most of the cheese.",
      "Top with remaining cheese and bake until golden.",
    ],
  },
  {
    id: 4,
    name: "Classic egg fried rice",
    time: 12,
    need: ["rice", "eggs", "onion"],
    bonus: ["garlic", "chicken"],
    tag: "quick",
    desc: "Day-old rice, scrambled egg, scallion, a hot wok and not much else.",
    steps: [
      "Scramble eggs lightly, set aside.",
      "Stir-fry onion (and garlic, if using) in a hot wok.",
      "Add rice, breaking up clumps, fry until heated through.",
      "Fold scrambled egg back in, season, and serve.",
    ],
  },
  {
    id: 5,
    name: "Chicken garlic noodle stir-fry",
    time: 20,
    need: ["chicken", "garlic", "pasta"],
    bonus: ["onion", "cheese"],
    tag: "quick",
    desc: "Quick stir-fry of sliced chicken and garlic tossed through noodles.",
    steps: [
      "Slice chicken thin, stir-fry until cooked through.",
      "Add chopped garlic and onion, cook 1 minute.",
      "Toss in cooked noodles, combine well over high heat.",
      "Season to taste and serve hot.",
    ],
  },
  {
    id: 6,
    name: "Tomato and cheese baked eggs",
    time: 18,
    need: ["tomato", "cheese", "eggs"],
    bonus: ["onion", "garlic"],
    tag: "comfort",
    desc: "Eggs baked into a bubbling tomato sauce, finished with melted cheese.",
    steps: [
      "Simmer crushed tomato with garlic and onion into a sauce.",
      "Pour sauce into a baking dish, crack eggs on top.",
      "Scatter cheese over the eggs.",
      "Bake until whites are set and cheese is melted.",
    ],
  },
  {
    id: 7,
    name: "Simple onion garlic soup",
    time: 25,
    need: ["onion", "garlic"],
    bonus: ["cheese", "pasta"],
    tag: "light",
    desc: "Slow-cooked onions in broth, garlic depth, a cheesy crouton on top.",
    steps: [
      "Slowly cook sliced onions until deeply softened.",
      "Add garlic and broth, simmer 15 minutes.",
      "Ladle into bowls, top with toasted bread and cheese.",
      "Broil briefly if you want the cheese bubbling.",
    ],
  },
  {
    id: 8,
    name: "Chicken and rice one-pot",
    time: 30,
    need: ["chicken", "rice", "onion"],
    bonus: ["garlic", "tomato"],
    tag: "hearty",
    desc: "Everything in one pot: chicken, rice, onion, simmered till tender.",
    steps: [
      "Brown chicken pieces in a heavy pot, then remove.",
      "Sauté onion (and garlic) in the same pot.",
      "Add rice and stock, return chicken on top.",
      "Cover and simmer until rice is tender.",
    ],
  },
  {
    id: 9,
    name: "Pasta aglio e olio with egg",
    time: 15,
    need: ["pasta", "garlic", "eggs"],
    bonus: ["cheese"],
    tag: "quick",
    desc: "Garlic-oil pasta finished with a silky raw egg stirred through at the end.",
    steps: [
      "Cook pasta, reserving a cup of pasta water.",
      "Gently sizzle sliced garlic in olive oil.",
      "Off heat, toss pasta with garlic oil and a beaten egg.",
      "Loosen with pasta water until glossy, add cheese.",
    ],
  },
  {
    id: 10,
    name: "Tomato cheese toastie",
    time: 10,
    need: ["tomato", "cheese"],
    bonus: ["onion", "garlic"],
    tag: "light",
    desc: "Thick tomato slices and melting cheese pressed between toasted bread.",
    steps: [
      "Slice tomato and cheese.",
      "Layer onto bread with optional onion and garlic.",
      "Press in a pan or sandwich press until golden.",
      "Slice and serve hot.",
    ],
  },
  {
    id: 11,
    name: "Garlic butter chicken with greens",
    time: 25,
    need: ["chicken", "garlic", "butter"],
    bonus: ["onion", "cheese"],
    tag: "hearty",
    desc: "Pan-seared chicken finished in a garlicky butter sauce.",
    steps: [
      "Season chicken and sear until cooked through.",
      "Remove chicken, melt butter and garlic in the same pan.",
      "Spoon garlic butter back over the chicken.",
      "Serve with greens or rice on the side.",
    ],
  },
  {
    id: 12,
    name: "Spiced onion and tomato rice",
    time: 22,
    need: ["rice", "onion", "tomato"],
    bonus: ["garlic", "chicken"],
    tag: "comfort",
    desc: "A one-pot spiced rice with softened onion and tomato through every grain.",
    steps: [
      "Sauté onion until soft, add garlic if using.",
      "Stir in chopped tomato, cook until breaking down.",
      "Add rice and stock, cover and cook through.",
      "Rest 5 minutes before fluffing and serving.",
    ],
  },
];

export const QUICK_ADD = [
  "eggs",
  "chicken",
  "rice",
  "onion",
  "garlic",
  "tomato",
  "cheese",
  "pasta",
  "butter",
];

export function scoreRecipe(recipe, fridgeSet) {
  const needHave = recipe.need.filter((i) => fridgeSet.has(i)).length;
  const bonusHave = recipe.bonus.filter((i) => fridgeSet.has(i)).length;
  return {
    needHave,
    needTotal: recipe.need.length,
    bonusHave,
    score: needHave * 2 + bonusHave,
  };
}

export function matchLabel(match) {
  const pct = match.needTotal === 0 ? 0 : match.needHave / match.needTotal;
  if (pct >= 1) return { text: "Perfect match", level: "perfect" };
  if (pct >= 0.66) return { text: "Close match", level: "close" };
  return { text: "Worth a try", level: "stretch" };
}
