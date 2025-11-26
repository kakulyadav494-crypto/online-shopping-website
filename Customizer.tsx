import React, { useState } from 'react';
import { Settings, X, LayoutGrid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COLORS } from '../constants';

export const Customizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, updateTheme } = useApp();

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform hover:shadow-[0_0_15px_var(--color-primary)]"
      >
        <Settings className="w-6 h-6 animate-spin-slow" />
      </button>

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-bold text-slate-800">Customize Store</h2>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Theme Colors */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Primary Color</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(COLORS).map(([name, hex]) => (
                  <button
                    key={name}
                    onClick={() => updateTheme({ primaryColor: hex })}
                    className={`w-full h-10 rounded-lg border-2 transition-all flex items-center justify-center capitalize text-xs font-medium ${
                      theme.primaryColor === hex ? 'border-slate-800 scale-105' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: hex, color: '#fff' }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Font Style</h3>
              <div className="space-y-2">
                <button
                  onClick={() => updateTheme({ fontFamily: 'sans' })}
                  className={`w-full p-3 text-left rounded-lg border ${
                    theme.fontFamily === 'sans' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-200 text-slate-600'
                  } font-sans`}
                >
                  Inter (Sans-Serif)
                </button>
                <button
                  onClick={() => updateTheme({ fontFamily: 'serif' })}
                  className={`w-full p-3 text-left rounded-lg border ${
                    theme.fontFamily === 'serif' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-200 text-slate-600'
                  } font-serif`}
                >
                  Merriweather (Serif)
                </button>
                <button
                  onClick={() => updateTheme({ fontFamily: 'mono' })}
                  className={`w-full p-3 text-left rounded-lg border ${
                    theme.fontFamily === 'mono' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-200 text-slate-600'
                  } font-mono`}
                >
                  Fira Code (Monospace)
                </button>
              </div>
            </div>

            {/* Layout */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Default Layout</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button
                    onClick={() => updateTheme({ viewMode: 'grid' })}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                      theme.viewMode === 'grid' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="text-sm">Grid</span>
                  </button>
                  <button
                    onClick={() => updateTheme({ viewMode: 'list' })}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                      theme.viewMode === 'list' ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm">List</span>
                  </button>
              </div>
            </div>

          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100">
             <p className="text-xs text-slate-400 text-center">Changes apply instantly across the entire application.</p>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};