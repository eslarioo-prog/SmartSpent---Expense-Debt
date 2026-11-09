import React, { useState } from 'react';
import { AndroidSimulator } from './components/AndroidSimulator';
import { KotlinCodeViewer } from './components/KotlinCodeViewer';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { Smartphone, Code, BookOpen, Wallet, Sparkles, Github, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'docs'>('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white" dir="rtl">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">مدير المصاريف والديون</h1>
              <p className="text-xs text-slate-400">Android Kotlin + Jetpack Compose & Room</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>محاكي التطبيق (Compose)</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>كود Kotlin (Room & Data Layer)</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>شرح العمارة البرمجية (Clean Architecture)</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>جاهز للاستخدام</span>
            </span>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex border-t border-slate-800 bg-slate-950 px-2 py-1.5 justify-around">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'simulator' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>المحاكي</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'code' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>كود Kotlin</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'docs' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>الشرح</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'simulator' && <AndroidSimulator />}
        {activeTab === 'code' && <KotlinCodeViewer />}
        {activeTab === 'docs' && <ArchitectureDocs />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>تطبيق إدارة المصاريف والديون (Expense & Debt Tracker) - تم بناء كود الـ Data Layer وهندسة Clean Architecture بطلب من المستخدم.</p>
      </footer>
    </div>
  );
}
