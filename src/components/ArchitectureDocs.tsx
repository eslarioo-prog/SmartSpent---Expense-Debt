import React from 'react';
import { Layers, Database, Cpu, CheckCircle2, Shield, Code, ArrowRight } from 'lucide-react';

export function ArchitectureDocs() {
  return (
    <div className="space-y-6 text-slate-100 max-w-4xl mx-auto pb-12">
      {/* Hero Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">بنية تطبيق أندرويد (Clean Architecture + Room)</h2>
            <p className="text-xs text-slate-400">تصميم هندسي متكامل وقابل للتوسع لإدارة المصاريف والديون الشخصية.</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          تم تصميم هذا المشروع باتباع المعايير الحديثة لتطوير تطبيقات أندرويد باستخدام <span className="text-indigo-400 font-semibold">Jetpack Compose</span> للواجهات الرسومية و <span className="text-emerald-400 font-semibold">Room Database</span> مع <span className="text-amber-400 font-semibold">Coroutines & Flow</span> للتخزين المحلي التفاعلي الفوري.
        </p>
      </div>

      {/* Architecture Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Layer 1: Data Layer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-200 mb-1">طبقة البيانات (Data Layer)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تحتوي على جداول قاعدة البيانات (Entities)، ومثبتات الـ DAO، وAppDatabase مع النمط الموحد (Repository Pattern).
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
            Room Database + SQLite + Flow
          </div>
        </div>

        {/* Layer 2: Domain Layer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-200 mb-1">طبقة النطاق (Domain Layer)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تمثل قواعد العمل (Business Logic)، وحالات الاستخدام (Use Cases) التي تعالج حسابات الأرصدة والديون والفلترة.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-violet-400 font-mono">
            Use Cases + Models
          </div>
        </div>

        {/* Layer 3: Presentation Layer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-200 mb-1">طبقة العرض (Presentation Layer)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              واجهات المستخدم التفاعلية المصممة بـ Jetpack Compose و Material 3، مع ViewModels لإدارة الحالة (State Management).
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-blue-400 font-mono">
            Jetpack Compose + ViewModel
          </div>
        </div>

      </div>

      {/* Key Features Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-200">مميزات الكود المُنشأ:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-0.5">Transaction Entity & Dao</span>
              <span className="text-slate-400">إدارة المعاملات مع دعم كامل للإضافة والتعديل والحذف واستعلام Flow المرتب بالتاريخ.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-0.5">Debt Entity & Dao</span>
              <span className="text-slate-400">إدارة الديون (دائن ومدينة) وحالة التسوية (isSettled) ومواعيد الاستحقاق.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-0.5">Singleton AppDatabase</span>
              <span className="text-slate-400">تهيئة قاعدة بيانات Room بمعاملات آمنة (Thread-safe Singleton) مع TypeConverters.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-0.5">Kotlin Coroutines & Flow</span>
              <span className="text-slate-400">تدفق بيانات تفاعلي (Reactive Streams) يحدث واجهة المستخدم تلقائياً عند أي تعديل في قاعدة البيانات.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
