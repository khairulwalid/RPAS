/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Layers, 
  Image as ImageIcon, 
  Copy, 
  ExternalLink, 
  Zap, 
  TrendingUp, 
  Search,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  BarChart3,
  Compass,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { analyzeStockTrends, TrendAnalysis } from './services/geminiService';

type Category = 'video' | 'vector' | 'photo';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('video');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrendAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await analyzeStockTrends(activeCategory);
      setData(result);
    } catch (error) {
      console.error("Error generating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (data?.searchUrl) {
      navigator.clipboard.writeText(data.searchUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categoryInfo: Record<Category, { label: string; desc: string; icon: React.ReactNode }> = {
    video: { 
      label: 'Video Content', 
      desc: 'Stock footage & motion graphics', 
      icon: <Video className="w-5 h-5" /> 
    },
    vector: { 
      label: 'Vector Graphics', 
      desc: 'Illustrations & UI elements', 
      icon: <Layers className="w-5 h-5" /> 
    },
    photo: { 
      label: 'Photography', 
      desc: 'High-res photos & textures', 
      icon: <ImageIcon className="w-5 h-5" /> 
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800 bg-[#0F172A] flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">StockTrend</h1>
          </div>

          <nav className="space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Categories</div>
            {(['video', 'vector', 'photo'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setData(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  activeCategory === cat 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className={`${activeCategory === cat ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                  {categoryInfo[cat].icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">{categoryInfo[cat].label}</div>
                  <div className="text-[10px] opacity-60 font-medium">{categoryInfo[cat].desc}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Analyzing millions of data points to find your next bestseller.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#020617]">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-[#0F172A]/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-bold">{categoryInfo[activeCategory].label}</span>
          </div>
          
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-slate-900" />}
            {loading ? 'Analyzing...' : 'Analyze Market'}
          </button>
        </header>

        <div className="p-10 max-w-5xl mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {!data && !loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-8"
              >
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                    Stop Guessing. <span className="text-emerald-500">Start Selling.</span>
                    <br />
                    <span className="text-2xl md:text-3xl font-bold text-slate-300">Find Winning Content Ideas in Seconds.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Gunakan sistem pintar untuk menemukan peluang konten yang belum banyak pesaing,
                    namun memiliki permintaan tinggi di Adobe Stock.
                  </p>
                </div>

                {/* Cara Menggunakan Section */}
                <div className="w-full max-w-xl bg-slate-900/40 border border-slate-800 p-8 rounded-3xl text-left space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-md flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    Cara Menggunakan:
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-700">1</span>
                      <p className="text-sm text-slate-300">Pilih kategori di sidebar kiri (<span className="text-emerald-400 font-medium">Video, Vector, atau Photo</span>).</p>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-700">2</span>
                      <p className="text-sm text-slate-300">Klik tombol <span className="text-emerald-400 font-bold">"Analyze Market"</span> di pojok kanan atas.</p>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-700">3</span>
                      <p className="text-sm text-slate-300">Tunggu beberapa detik selagi AI memindai data pasar untuk Anda.</p>
                    </li>
                  </ul>
                </div>

                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center">
                  <Compass className="w-10 h-10 text-slate-500" />
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-lg font-bold text-white">Scanning Adobe Stock...</div>
                  <div className="text-sm text-slate-500">Comparing demand vs supply for {activeCategory}</div>
                </div>
              </motion.div>
            )}

            {data && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-12 gap-6"
              >
                {/* Top Bar: URL & Actions */}
                <div className="col-span-12 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex items-center gap-6">
                  <div className="flex-1 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended Search URL</div>
                    <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-emerald-400 font-mono text-xs truncate">
                      {data.searchUrl}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={copyToClipboard}
                      className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-300"
                      title="Copy URL"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <a 
                      href={data.searchUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors text-slate-900"
                      title="Visit URL"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Left Column: Trends */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                  <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="font-bold text-white">Market Trends</h3>
                    </div>
                    <div className="space-y-3">
                      {data.trends.map((trend, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                          <span className="text-sm text-slate-300 font-medium">{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Search className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="font-bold text-white">Market Insights</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      "{data.marketInsights}"
                    </p>
                  </div>
                </div>

                {/* Right Column: Rare Gaps */}
                <div className="col-span-12 lg:col-span-7 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="font-bold text-white">High Potential Gaps</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Low Competition</span>
                  </div>

                  <div className="grid gap-4">
                    {data.rareGaps.map((gap, i) => (
                      <div key={i} className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{gap.theme}</h4>
                            <div className="flex gap-2">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                gap.demand === 'High' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                              }`}>
                                {gap.demand} Demand
                              </span>
                              <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-bold uppercase tracking-wider">
                                {gap.competition} Competition
                              </span>
                            </div>
                          </div>
                          <div className="p-2 bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {gap.potential}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
