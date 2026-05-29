import { usePassword } from '../context/PasswordContext';
import { Copy, Trash2, Heart, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/ToastProvider';
import { Card } from '../components/ui/Card';

export default function HistoryPage() {
  const { history, favorites, toggleFavorite, deleteFromHistory, clearHistory } = usePassword();
  const location = useLocation();
  const { addToast } = useToast();
  const isFavorites = location.search.includes('favorites');
  
  const displayList = isFavorites ? favorites : history;

  const handleCopy = (pwd) => {
    navigator.clipboard.writeText(pwd);
    addToast('Password copied!', 'success');
  };

  return (
    <div className="flex flex-1 w-full max-w-[1200px] mx-auto overflow-hidden bg-white/10 sm:rounded-3xl border-y sm:border border-white/20 sm:shadow-2xl sm:my-6 backdrop-blur-xl p-4 sm:p-10 flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <Link to="/generator" className="text-white/70 hover:text-white mb-4 inline-block font-medium">← Back to Studio</Link>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            {isFavorites ? 'Favorite Passwords' : 'Password History'}
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            {isFavorites ? 'Your securely saved passwords.' : 'Recently generated passwords stored locally.'}
          </p>
        </div>
        {!isFavorites && history.length > 0 && (
          <button 
            onClick={() => {
              clearHistory();
              addToast('History cleared', 'info');
            }}
            className="bg-red-500/20 text-white hover:bg-red-500/40 px-6 py-3 rounded-xl font-bold transition-colors border border-red-500/50 w-full sm:w-auto"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto sm:pr-4 space-y-4">
        {displayList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/50 bg-black/10 rounded-2xl border border-white/5">
            <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl font-medium">No passwords found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayList.map((item) => (
              <Card key={item.id} variant="white" hover={false} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between group gap-4">
                <div className="flex flex-col overflow-hidden w-full lg:w-auto">
                  <span className="text-xl sm:text-2xl font-mono text-gray-900 font-bold mb-2 tracking-wider truncate w-full">{item.password}</span>
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 font-medium">
                    <span className="bg-brand-100/10 text-brand-300 px-3 py-1 rounded-full whitespace-nowrap">{item.category}</span>
                    <span className="flex items-center whitespace-nowrap">{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity justify-end lg:justify-start w-full lg:w-auto border-t lg:border-0 pt-4 lg:pt-0 border-gray-100">
                  <button 
                    onClick={() => handleCopy(item.password)}
                    className="p-3 text-gray-600 hover:text-brand-200 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors interactive-element flex-1 lg:flex-none flex justify-center items-center"
                    title="Copy"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-3 rounded-xl transition-colors interactive-element flex-1 lg:flex-none flex justify-center items-center ${favorites.some(f => f.id === item.id) ? 'text-red-500 bg-red-100 hover:bg-red-200' : 'text-gray-600 bg-gray-100 hover:text-red-500 hover:bg-red-50'}`}
                    title="Favorite"
                  >
                    <Heart className="w-5 h-5" fill={favorites.some(f => f.id === item.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-3 text-gray-600 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-xl transition-colors interactive-element flex-1 lg:flex-none flex justify-center items-center"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}