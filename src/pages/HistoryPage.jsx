import React from 'react';
import { usePassword } from '../context/PasswordContext';
import { Copy, Trash2, Heart, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function HistoryPage() {
  const { history, favorites, toggleFavorite, deleteFromHistory, clearHistory } = usePassword();
  const location = useLocation();
  const isFavorites = location.search.includes('favorites');
  
  const displayList = isFavorites ? favorites : history;

  const handleCopy = (pwd) => {
    navigator.clipboard.writeText(pwd);
  };

  return (
    <div className="flex flex-1 w-full max-w-[1200px] mx-auto overflow-hidden bg-white/10 rounded-3xl border border-white/20 shadow-2xl my-6 backdrop-blur-xl p-10 flex-col">
      <div className="flex justify-between items-end mb-10">
        <div>
          <Link to="/generator" className="text-white/70 hover:text-white mb-4 inline-block font-medium">← Back to Studio</Link>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            {isFavorites ? 'Favorite Passwords' : 'Password History'}
          </h1>
          <p className="text-white/70 text-lg">
            {isFavorites ? 'Your securely saved passwords.' : 'Recently generated passwords stored locally.'}
          </p>
        </div>
        {!isFavorites && history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="bg-red-500/20 text-white hover:bg-red-500/40 px-6 py-3 rounded-xl font-bold transition-colors border border-red-500/50"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-4">
        {displayList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/50">
            <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl font-medium">No passwords found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayList.map((item) => (
              <div key={item.id} className="white-card p-5 flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="text-2xl font-mono text-gray-900 font-bold mb-1 tracking-wider">{item.password}</span>
                  <div className="flex gap-3 text-sm text-gray-500 font-medium">
                    <span className="bg-brand-100/10 text-brand-300 px-3 py-1 rounded-full">{item.category}</span>
                    <span className="flex items-center">{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleCopy(item.password)}
                    className="p-3 text-gray-400 hover:text-brand-200 hover:bg-gray-100 rounded-xl transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-3 rounded-xl transition-colors ${favorites.some(f => f.id === item.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'}`}
                    title="Favorite"
                  >
                    <Heart className="w-5 h-5" fill={favorites.some(f => f.id === item.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}