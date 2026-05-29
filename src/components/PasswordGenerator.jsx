import { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, Save, Eye, EyeOff, ShieldCheck, Info } from 'lucide-react';
import { generatePassword, calculateStrength } from '../utils/crypto';
import { usePassword } from '../context/PasswordContext';
import { useToast } from './ui/ToastProvider';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export default function PasswordGenerator({ category }) {
  const { addToHistory, settings, updateSettings } = usePassword();
  const { addToast } = useToast();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  
  const [length, setLength] = useState(category?.id === 'pin' ? 6 : (category?.id === 'passphrase' ? 20 : settings.length));
  const [uppercase, setUppercase] = useState(settings.uppercase);
  const [lowercase, setLowercase] = useState(settings.lowercase);
  const [numbers, setNumbers] = useState(settings.numbers);
  const [symbols, setSymbols] = useState(category?.id !== 'pin' ? settings.symbols : false);
  const [excludeSimilar, setExcludeSimilar] = useState(settings.excludeSimilar);
  const [mode, setMode] = useState(category?.id === 'pin' ? 'pin' : (settings.mode || 'random'));

  const strength = calculateStrength(password);

  const handleGenerate = useCallback(() => {
    const pwd = generatePassword({
      length, uppercase, lowercase, numbers, symbols, excludeSimilar, mode
    });
    setPassword(pwd);
  }, [length, uppercase, lowercase, numbers, symbols, excludeSimilar, mode]);

  useEffect(() => {
    if (category?.id === 'pin') {
      setMode('pin');
      setLength(6);
    } else if (category?.id === 'custom') {
      // allow all modes
    }
  }, [category]);

  useEffect(() => {
    // Only auto-generate when settings change, avoid cascading sets directly
    const pwd = generatePassword({
      length, uppercase, lowercase, numbers, symbols, excludeSimilar, mode
    });
    setPassword(pwd);
    updateSettings({ length, uppercase, lowercase, numbers, symbols, excludeSimilar, mode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, uppercase, lowercase, numbers, symbols, excludeSimilar, mode, category]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    addToast('Password copied to clipboard!', 'success');
  };

  const handleSave = () => {
    addToHistory(password, category?.title || 'Universal');
    addToast('Password saved to history!', 'success');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start w-full">
      {/* Main Generator Card */}
      <Card variant="white" hover={false} className="flex-1 w-full p-6 sm:p-8 border border-gray-100 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">{category?.title || 'Universal'} Generator</h2>
          <Button variant="ghost" className="text-brand-200 bg-brand-100/10 hover:bg-brand-100/20 shrink-0" onClick={handleSave}>
            <Save className="w-5 h-5" /> Save
          </Button>
        </div>
        <p className="text-gray-500 mb-8">{category?.desc || 'Generate a cryptographically secure password.'}</p>

        {/* Output Field */}
        <div className="relative mb-10 w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-gray-50 border-2 border-gray-200 rounded-2xl p-2 focus-within:border-brand-200 transition-colors w-full overflow-hidden">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="flex-1 bg-transparent text-2xl sm:text-3xl font-mono text-gray-800 p-4 outline-none w-full min-w-0"
            />
            <div className="flex gap-2 p-2 sm:p-0 justify-end border-t sm:border-t-0 border-gray-200 sm:pr-2">
              <button onClick={handleGenerate} className="p-3 text-gray-400 hover:text-brand-200 hover:bg-gray-200 rounded-xl transition-colors interactive-element">
                <RefreshCw className="w-6 h-6" />
              </button>
              <button onClick={() => setShowPassword(!showPassword)} className="p-3 text-gray-400 hover:text-brand-200 hover:bg-gray-200 rounded-xl transition-colors interactive-element hidden sm:block">
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
              <button onClick={handleCopy} className="px-4 sm:px-6 py-3 text-white bg-gradient-to-r from-brand-100 to-brand-400 hover:from-brand-200 hover:to-brand-500 rounded-xl transition-colors flex items-center gap-2 font-bold shadow-lg interactive-element shrink-0">
                <Copy className="w-5 h-5" /> <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter & Analytics */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100 w-full">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-400" /> Password Strength
              </span>
              <span className={`font-bold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
            </div>
            <div className="flex gap-2 h-3 w-full">
              {[1, 2, 3, 4].map(level => (
                <div 
                  key={level} 
                  className={`flex-1 rounded-full transition-all duration-500 ${level <= strength.score ? strength.color : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
            <p className="text-sm text-gray-500 font-medium mb-1">Entropy Score</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{Math.round(strength.entropy)} <span className="text-base text-gray-400 font-normal">bits</span></p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
            <p className="text-sm text-gray-500 font-medium mb-1">Estimated Crack Time</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{strength.crackTime}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-8 w-full">
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-semibold text-gray-700">Password Length</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setLength(l => Math.max(4, l - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg font-bold text-gray-600 hover:bg-gray-200 shrink-0">-</button>
                <span className="font-bold text-brand-200 text-xl sm:text-2xl w-10 text-center">{length}</span>
                <button onClick={() => setLength(l => Math.min(128, l + 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg font-bold text-gray-600 hover:bg-gray-200 shrink-0">+</button>
              </div>
            </div>
            <input 
              type="range" 
              min="4" max="128" 
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-200"
            />
          </div>

          {category?.id !== 'pin' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                <button 
                  onClick={() => setMode('random')}
                  className={`p-2 sm:p-3 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ${mode === 'random' ? 'border-brand-200 bg-brand-50 text-brand-400' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >Random</button>
                <button 
                  onClick={() => setMode('passphrase')}
                  className={`p-2 sm:p-3 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ${mode === 'passphrase' ? 'border-brand-200 bg-brand-50 text-brand-400' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >Passphrase</button>
                <button 
                  onClick={() => setMode('pronounceable')}
                  className={`p-2 sm:p-3 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ${mode === 'pronounceable' ? 'border-brand-200 bg-brand-50 text-brand-400' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >Pronounceable</button>
                <button 
                  onClick={() => setMode('pin')}
                  className={`p-2 sm:p-3 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ${mode === 'pin' ? 'border-brand-200 bg-brand-50 text-brand-400' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >PIN Code</button>
              </div>

              {mode === 'random' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                  {[
                    { label: 'Uppercase (A-Z)', state: uppercase, set: setUppercase },
                    { label: 'Lowercase (a-z)', state: lowercase, set: setLowercase },
                    { label: 'Numbers (0-9)', state: numbers, set: setNumbers },
                    { label: 'Symbols (!@#$)', state: symbols, set: setSymbols },
                    { label: 'Exclude Similar (i, l, 1, L, o, 0, O)', state: excludeSimilar, set: setExcludeSimilar }
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer p-3 sm:p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors w-full">
                      <input 
                        type="checkbox" 
                        checked={opt.state} 
                        onChange={(e) => opt.set(e.target.checked)}
                        className="w-5 h-5 rounded text-brand-200 focus:ring-brand-200 cursor-pointer shrink-0"
                      />
                      <span className="font-medium text-gray-700 text-sm sm:text-base break-words">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Security Tips Sidebar */}
      <Card variant="dark" hover={false} className="w-full xl:w-80 shrink-0 p-6 flex flex-col gap-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-200" /> Security Tips
        </h3>
        
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="font-semibold text-brand-200 mb-1">Use a Password Manager</h4>
            <p className="text-sm text-white/70">Never write passwords down or reuse them. Use a secure manager to store them.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="font-semibold text-brand-200 mb-1">Enable 2FA</h4>
            <p className="text-sm text-white/70">Always enable Two-Factor Authentication (2FA) wherever possible for an extra layer of security.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="font-semibold text-brand-200 mb-1">Check for Breaches</h4>
            <p className="text-sm text-white/70">Regularly check if your accounts have been compromised using HaveIBeenPwned.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="font-semibold text-brand-200 mb-1">Aim for 60+ Bits</h4>
            <p className="text-sm text-white/70">A password with 60+ bits of entropy is highly resistant to modern brute-force attacks.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
