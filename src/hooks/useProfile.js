import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../supabase";

const SAVE_DEBOUNCE_MS = 800;

// Loads a user's profile row (fridge + saved recipes) on mount, and
// persists changes back to Supabase with a short debounce so rapid
// swipes don't fire a network request per swipe.
export function useProfile(userId) {
  const [fridge, setFridge] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const saveTimer = useRef(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!userId) return;

    let isCurrent = true;
    hasLoaded.current = false;

    async function loadProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("fridge, saved")
        .eq("id", userId)
        .maybeSingle();

      if (!isCurrent) return;

      if (error) {
        console.error("Failed to load profile:", error.message);
      } else if (data) {
        setFridge(data.fridge || []);
        setSaved(data.saved || []);
      } else {
        // First time this user has signed in — create their row.
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ id: userId, fridge: [], saved: [] });
        if (insertError) {
          console.error("Failed to create profile:", insertError.message);
        }
      }
      hasLoaded.current = true;
      setLoading(false);
    }

    loadProfile();

    return () => {
      isCurrent = false;
    };
  }, [userId]);

  const persist = useCallback(
    (nextFridge, nextSaved) => {
      if (!userId || !hasLoaded.current) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        const { error } = await supabase
          .from("profiles")
          .update({ fridge: nextFridge, saved: nextSaved })
          .eq("id", userId);
        if (error) {
          console.error("Failed to save profile:", error.message);
        }
      }, SAVE_DEBOUNCE_MS);
    },
    [userId]
  );

  function updateFridge(nextFridgeOrFn) {
    setFridge((prev) => {
      const next =
        typeof nextFridgeOrFn === "function"
          ? nextFridgeOrFn(prev)
          : nextFridgeOrFn;
      persist(next, saved);
      return next;
    });
  }

  function updateSaved(nextSavedOrFn) {
    setSaved((prev) => {
      const next =
        typeof nextSavedOrFn === "function"
          ? nextSavedOrFn(prev)
          : nextSavedOrFn;
      persist(fridge, next);
      return next;
    });
  }

  return {
    fridge,
    setFridge: updateFridge,
    saved,
    setSaved: updateSaved,
    loading,
  };
}
