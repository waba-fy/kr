import { ManagedContentContext } from "./ManagedContentContext";
import { loadManagedContent } from "./managedContent.mjs";
import { useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const useManagedContent = (section, fallback = []) => {
  const initial = useContext(ManagedContentContext)[section];
  const [items, setItems] = useState(initial ?? fallback);
  const [loading, setLoading] = useState(initial === undefined);
  const [loadedFromApi, setLoadedFromApi] = useState(initial !== undefined);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const content = await loadManagedContent(`${API_URL}/content/${section}`);
        if (active) { setItems(content); setLoadedFromApi(true); }
      } catch {
        // Static data remains the safe fallback when the API is unavailable.
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [section]);

  return { items, loading, loadedFromApi };
};

export default useManagedContent;
