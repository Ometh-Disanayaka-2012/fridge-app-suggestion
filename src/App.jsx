import { useState, useEffect, useMemo } from "react";
import { supabase } from "./supabase";
import { useProfile } from "./hooks/useProfile";
import { RECIPES, scoreRecipe } from "./data/recipes";
import SignIn from "./components/SignIn";
import FridgeInput from "./components/FridgeInput";
import SwipeDeck from "./components/SwipeDeck";
import SavedList from "./components/SavedList";
import EmptyState from "./components/EmptyState";
import "./App.css";

const SCREENS = {
  INPUT: "input",
  SWIPE: "swipe",
  SAVED: "saved",
};

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = not checked yet
  const [screen, setScreen] = useState(SCREENS.INPUT);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        setScreen(SCREENS.INPUT);
        setCurrent(0);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;
  const { fridge, setFridge, saved, setSaved, loading } = useProfile(userId);

  const fridgeSet = useMemo(() => new Set(fridge), [fridge]);

  const queue = useMemo(() => {
    return RECIPES.map((r) => ({ ...r, match: scoreRecipe(r, fridgeSet) }))
      .filter((r) => r.match.needHave >= Math.max(1, r.need.length - 1))
      .sort((a, b) => b.match.score - a.match.score);
  }, [fridgeSet]);

  function handleFindRecipes() {
    setCurrent(0);
    setScreen(SCREENS.SWIPE);
  }

  function handleSwipe(liked, recipe) {
    if (liked) setSaved((prev) => [...prev, recipe]);
    setCurrent((prev) => prev + 1);
  }

  function handleBackToFridge() {
    setScreen(SCREENS.INPUT);
  }

  function handleViewSaved() {
    setScreen(SCREENS.SAVED);
  }

  function handleBackToSwipe() {
    setScreen(SCREENS.SWIPE);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  // Still checking for an existing session on first load.
  if (session === undefined) {
    return (
      <div className="app-shell">
        <main className="app-card">
          <p className="loading-text">Loading…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">tonight's dinner</p>
          <h1 className="app-title">What's in the fridge?</h1>
        </div>
        {session && (
          <button type="button" className="link-btn signout-btn" onClick={handleSignOut}>
            Sign out
          </button>
        )}
      </header>

      <main className="app-card">
        {!session && <SignIn />}

        {session && loading && <p className="loading-text">Loading your fridge…</p>}

        {session && !loading && screen === SCREENS.INPUT && (
          <FridgeInput
            fridge={fridge}
            setFridge={setFridge}
            onFindRecipes={handleFindRecipes}
          />
        )}

        {session && !loading && screen === SCREENS.SWIPE && queue.length === 0 && (
          <EmptyState onBack={handleBackToFridge} />
        )}

        {session && !loading && screen === SCREENS.SWIPE && queue.length > 0 && (
          <SwipeDeck
            queue={queue}
            current={current}
            fridgeSet={fridgeSet}
            savedCount={saved.length}
            onSwipe={handleSwipe}
            onBack={handleBackToFridge}
            onViewSaved={handleViewSaved}
          />
        )}

        {session && !loading && screen === SCREENS.SAVED && (
          <SavedList saved={saved} fridgeSet={fridgeSet} onBack={handleBackToSwipe} />
        )}
      </main>
    </div>
  );
}
