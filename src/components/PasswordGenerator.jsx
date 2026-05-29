import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Save, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { generatePassword, calculateStrength } from '../utils/crypto';
import { usePassword } from '../context/PasswordContext';

export default function PasswordGenerator({ category }) {
  const { addToHistory } = usePassword();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Options
  const [length, setLength] = useState(category?.id === 'pin' ? 6 : 16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(category?.id !== 'pin');
  
  const strength = calculateStrength(password);

  const handleGenerate = () => {
    const pwd = generatePassword({
      length, uppercase, lowercase, numbers, symbols,
      mode: category?.id === 'pin' ? 'pin' : 'random'
    });
    setPassword(pwd);
  };

  useEffect(() => {
    handleGenerate();
  }, [length, uppercase, lowercase, numbers, symbols, category]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    addToHistory(password, category?.title || 'Universal');
    alert('Password saved to history!');
  };

  return (
    <div className="flex gap-8 items-start">
      {/* Main Generator Card */}
      <div className="flex-1 white-card p-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">{category?.title || 'Universal'} Password Generator</h2>
        <p className="text-gray-500 mb-8">{category?.desc || 'Generate a strong password for any purpose.'}</p>

        {/* Output Field */}
        <div className="relative mb-8">
          <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl p-2 focus-within:border-brand-200 transition-colors">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="flex-1 bg-transparent text-3xl font-mono text-gray-800 p-4 outline-none w-full"
            />
            <div className="flex gap-2 pr-2">
              <button onClick={handleGenerate} className="p-3 text-gray-400 hover:text-brand-200 hover:bg-gray-200 rounded-xl transition-colors">
                <RefreshCw className="w-6 h-6" />
              </button>
              <button onClick={() => setShowPassword(!showPassword)} className="p-3 text-gray-400 hover:text-brand-200 hover:bg-gray-200 rounded-xl transition-colors">
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
              <button onClick={handleCopy} className="p-3 text-white bg-brand-200 hover:bg-brand-300 rounded-xl transition-colors flex items-center gap-2 font-bold">
                <Copy className="w-5 h-5" /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Strength</span>
            <span className={`font-bold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
          </div>
          <div className="flex gap-2 h-3">
            {[1, 2, 3, 4].map(level => (
              <div 
                key={level} 
                className={`flex-1 rounded-full transition-all duration-500 ${level <= strength.score ? strength.color : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        {category?.id !== 'pin' && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold text-gray-700">Length</label>
                <span className="font-bold text-brand-200 text-xl">{length}</span>
              </div>
              <input 
                type="range" 
                min="8" max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-200"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Uppercase (A-Z)', state: uppercase, set: setUppercase },
                { label: 'Lowercase (a-z)', state: lowercase, set: setLowercase },
                { label: 'Numbers (0-9)', state: numbers, set: setNumbers },
                { label: 'Symbols (!@#)', state: symbols, set: setSymbols },
              ].map((opt, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-200 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opt.state} 
                    onChange={(e) => opt.set(e.target.checked)}
                    className="w-5 h-5 text-brand-200 rounded focus:ring-brand-200"
                  />
                  <span className="font-medium text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {category?.id === 'pin' && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold text-gray-700">PIN Length</label>
                <span className="font-bold text-brand-200 text-xl">{length}</span>
              </div>
              <input 
                type="range" 
                min="4" max="12" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-200"
              />
            </div>
          </div>
        )}

        <div className="mt-10 flex gap-4">
           <button onClick={handleGenerate} className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors">
             Regenerate
           </button>
           <button onClick={handleSave} className="flex-1 bg-brand-100 text-white py-4 rounded-xl font-bold hover:bg-brand-200 transition-colors flex items-center justify-center gap-2">
             <Save className="w-5 h-5" /> Save Password
           </button>
        </div>
      </div>

      {/* Right Tips Panel */}
      <div className="hidden lg:block w-80 white-card p-6 bg-brand-50/50 border border-brand-100/20">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-brand-200" />
          <h3 className="text-xl font-bold text-gray-900">Password Tips</h3>
        </div>
        <ul className="space-y-4">
          {[
            'Use at least 12–16 characters.',
            'Mix of letters, numbers & symbols.',
            'Avoid personal information.',
            "Don't reuse passwords.",
            'Enable 2FA for extra security.'
          ].map((tip, i) => (
            <li key={i} className="flex gap-3 text-gray-600">
              <div className="mt-1 w-5 h-5 rounded-full bg-brand-100/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-brand-200"></div>
              </div>
              <span className="font-medium">{tip}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 flex justify-center">
           <ShieldCheck className="w-32 h-32 text-brand-100/20" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}