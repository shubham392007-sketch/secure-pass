import React, { createContext, useContext, useState, useEffect } from 'react';

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('securepass_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('securepass_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('securepass_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('securepass_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToHistory = (password, category = 'Universal') => {
    setHistory(prev => [{ id: Date.now().toString(), password, category, timestamp: new Date().toISOString() }, ...prev].slice(0, 100));
  };

  const toggleFavorite = (id) => {
    const item = history.find(h => h.id === id) || favorites.find(f => f.id === id);
    if (!item) return;

    setFavorites(prev => {
      const isFav = prev.some(f => f.id === id);
      if (isFav) return prev.filter(f => f.id !== id);
      return [{...item}, ...prev];
    });
  };

  const deleteFromHistory = (id) => {
    setHistory(prev => prev.filter(h => h.id !== id));
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const clearHistory = () => setHistory([]);

  return (
    <PasswordContext.Provider value={{ history, favorites, addToHistory, toggleFavorite, deleteFromHistory, clearHistory }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);