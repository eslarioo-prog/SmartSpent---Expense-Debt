import React, { useState } from 'react';
import { Transaction, Debt } from '../types';
import { 
  Wallet, Plus, ArrowDownRight, ArrowUpRight, Users, 
  Trash2, Smartphone, Monitor, 
  TrendingUp, TrendingDown, Bell, User, Check, X, 
  PieChart, ShieldCheck, Sun, Moon, CreditCard, Globe
} from 'lucide-react';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'راتب الشهري', amount: 3500.0, type: 'INCOME', category: 'راتب', date: Date.now() - 86400000 * 2 },
  { id: 2, title: 'مشتريات السوبرماركت', amount: 245.5, type: 'EXPENSE', category: 'طعام وغذاء', date: Date.now() - 86400000 },
  { id: 3, title: 'فاتورة الكهرباء والماء', amount: 120.0, type: 'EXPENSE', category: 'فواتير', date: Date.now() - 3600000 * 5 },
  { id: 4, title: 'مشروع تصميم حر', amount: 450.0, type: 'INCOME', category: 'أعمال حرة', date: Date.now() - 3600000 * 2 },
];

const INITIAL_DEBTS: Debt[] = [
  { id: 1, personName: 'أحمد محمد', amount: 500.0, type: 'IM_OWED', dueDate: Date.now() + 86400000 * 5, isSettled: false, notes: 'قرض مؤقت لنهاية الشهر' },
  { id: 2, personName: 'خالد عبد الله', amount: 300.0, type: 'I_OWE', dueDate: Date.now() + 86400000 * 2, isSettled: false, notes: 'ثمن وجبة العشاء' },
  { id: 3, personName: 'شركة التقنية', amount: 1200.0, type: 'IM_OWED', dueDate: Date.now() - 86400000 * 3, isSettled: true, notes: 'مستحقات استشارات' },
];

const CATEGORIES_AR = ['طعام وغذاء', 'فواتير', 'راتب', 'أعمال حرة', 'نقل ومواصلات', 'ترفيه', 'تسوق', 'أخرى'];
const CATEGORIES_EN = ['Food & Groceries', 'Bills', 'Salary', 'Freelance', 'Transport', 'Entertainment', 'Shopping', 'Other'];

export function AndroidSimulator() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [debts, setDebts] = useState<Debt[]>(INITIAL_DEBTS);
  const [activeTab, setActiveTab] = useState<'home' | 'debts' | 'analytics'>('home');
  const [debtTab, setDebtTab] = useState<'IM_OWED' | 'I_OWE'>('IM_OWED');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Modal states
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showAddDebtModal, setShowAddDebtModal] = useState(false);
  
  // Form states for Transaction
  const [transTitle, setTransTitle] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [transType, setTransType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const categories = lang === 'ar' ? CATEGORIES_AR : CATEGORIES_EN;
  const [transCategory, setTransCategory] = useState(categories[0]);

  // Form states for Debt
  const [debtPerson, setDebtPerson] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtType, setDebtType] = useState<'IM_OWED' | 'I_OWE'>('IM_OWED');
  const [debtNotes, setDebtNotes] = useState('');

  // Financial calculations
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const imOwedTotal = debts.filter(d => d.type === 'IM_OWED' && !d.isSettled).reduce((acc, d) => acc + d.amount, 0);
  const iOweTotal = debts.filter(d => d.type === 'I_OWE' && !d.isSettled).reduce((acc, d) => acc + d.amount, 0);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transTitle || !transAmount) return;
    const newTx: Transaction = {
      id: Date.now(),
      title: transTitle,
      amount: parseFloat(transAmount) || 0,
      type: transType,
      category: transCategory,
      date: Date.now()
    };
    setTransactions([newTx, ...transactions]);
    setTransTitle('');
    setTransAmount('');
    setShowAddTransactionModal(false);
  };

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtPerson || !debtAmount) return;
    const newDebt: Debt = {
      id: Date.now(),
      personName: debtPerson,
      amount: parseFloat(debtAmount) || 0,
      type: debtType,
      dueDate: Date.now() + 86400000 * 7,
      isSettled: false,
      notes: debtNotes
    };
    setDebts([newDebt, ...debts]);
    setDebtPerson('');
    setDebtAmount('');
    setDebtNotes('');
    setShowAddDebtModal(false);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleDebtSettled = (id: number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, isSettled: !d.isSettled } : d));
  };

  // Translations dictionary
  const t = {
    ar: {
      appName: 'مصاريفي',
      welcome: 'مرحباً بك،',
      netBalance: 'إجمالي الرصيد الحقيقي',
      income: 'إجمالي الدخل',
      expense: 'إجمالي المصاريف',
      addIncome: 'إضافة دخل',
      addExpense: 'إضافة مصروف',
      addDebt: 'إضافة دين',
      recentTx: 'أحدث المعاملات',
      viewAll: 'عرض الكل',
      debtsTitle: 'إدارة الديون والالتزامات',
      imOwed: 'فلوس ليا',
      iOwe: 'فلوس عليا',
      settled: 'تم السداد بنجاح ✓',
      unsettled: 'غير مسدد',
      settleDebt: 'تسوية الدين',
      cancelSettle: 'إلغاء التسوية',
      analyticsTitle: 'تحليلات الميزانية والتصنيفات',
      categoryDist: 'توزيع المصاريف حسب الفئات',
      dbSecurity: 'أمان قاعدة البيانات المحلية (Room DB)',
      dbSecurityDesc: 'جميع البيانات مشفرة ومحفوظة محلياً على جهازك بالكامل.',
      homeNav: 'الرئيسية',
      debtsNav: 'الديون',
      analyticsNav: 'التحليلات',
      newTxTitle: 'إضافة معاملة جديدة',
      txTitleLabel: 'عنوان المعاملة',
      amountLabel: 'المبلغ ($)',
      typeLabel: 'النوع',
      categoryLabel: 'التصنيف',
      save: 'حفظ المعاملة',
      cancel: 'إلغاء',
      newDebtTitle: 'إضافة دين جديد',
      personLabel: 'اسم الشخص / الجهة',
      debtTypeLabel: 'نوع الدين',
      notesLabel: 'ملاحظات',
      saveDebt: 'حفظ الدين'
    },
    en: {
      appName: 'MyExpenses',
      welcome: 'Welcome back,',
      netBalance: 'Net Balance',
      income: 'Total Income',
      expense: 'Total Expenses',
      addIncome: 'Add Income',
      addExpense: 'Add Expense',
      addDebt: 'Add Debt',
      recentTx: 'Recent Transactions',
      viewAll: 'View All',
      debtsTitle: 'Debts & Liabilities',
      imOwed: "I'm Owed",
      iOwe: 'I Owe',
      settled: 'Settled ✓',
      unsettled: 'Unsettled',
      settleDebt: 'Settle',
      cancelSettle: 'Unsettle',
      analyticsTitle: 'Budget & Category Analytics',
      categoryDist: 'Expense Distribution by Category',
      dbSecurity: 'Local Database Security (Room DB)',
      dbSecurityDesc: 'All data is encrypted and saved locally on your device.',
      homeNav: 'Home',
      debtsNav: 'Debts',
      analyticsNav: 'Analytics',
      newTxTitle: 'Add New Transaction',
      txTitleLabel: 'Transaction Title',
      amountLabel: 'Amount ($)',
      typeLabel: 'Type',
      categoryLabel: 'Category',
      save: 'Save Transaction',
      cancel: 'Cancel',
      newDebtTitle: 'Add New Debt',
      personLabel: 'Person / Entity Name',
      debtTypeLabel: 'Debt Type',
      notesLabel: 'Notes',
      saveDebt: 'Save Debt'
    }
  }[lang];

  return (
    <div className="flex flex-col items-center">
      {/* Simulator Controls Toolbar */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-slate-100 font-bold text-base">محاكي التطبيق (Multi-Language: Arabic & English)</h2>
            <p className="text-slate-400 text-xs">تبديل فوري بين اللغة العربية والإنجليزية مع الحفاظ على الاتجاه وتحديث الثيم.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              isPhoneFrame 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>إطار هاتف</span>
          </button>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              !isPhoneFrame 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>عرض موسع</span>
          </button>
        </div>
      </div>

      {/* Device Frame Wrapper */}
      <div className={`transition-all duration-300 ${isPhoneFrame ? `w-[380px] h-[780px] ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} rounded-[48px] p-3 border-[8px] border-slate-800 shadow-2xl relative flex flex-col` : `w-full max-w-4xl ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-[750px]`}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* Phone Camera Notch / Status Bar if Phone Frame */}
        {isPhoneFrame && (
          <div className={`w-full pt-1 pb-3 px-6 flex items-center justify-between text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} font-mono select-none`}>
            <span>09:41</span>
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                <div className="w-3 h-full bg-emerald-400 rounded-2xs"></div>
              </div>
            </div>
          </div>
        )}

        {/* Top App Bar with Theme & Language Toggle */}
        <div className={`px-5 py-3.5 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} flex items-center justify-between transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md shrink-0">
              <img src="/assets/aistudio/1794215823840_6f66baf1.jpg" alt="App Icon" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.welcome}</div>
              <h1 className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{t.appName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium font-mono ${isDarkMode ? 'bg-[#1E293B] border-slate-700 text-sky-400' : 'bg-white border-slate-200 text-sky-600 shadow-sm'} border flex items-center gap-1 transition-all hover:scale-105 active:scale-95`}
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-[#1E293B] border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-indigo-600 shadow-sm'} border flex items-center justify-center transition-all hover:scale-105 active:scale-95`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-[#1E293B] border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'} border flex items-center justify-center relative`}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto px-4 py-3 space-y-4 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
          
          {/* Tab 1: Home Dashboard */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              
              {/* Total Balance Header Card */}
              <div className={`rounded-2xl p-5 border shadow-xl relative overflow-hidden transition-colors ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#0f172a] border-slate-700/60 text-white' 
                  : 'bg-gradient-to-br from-white via-white to-slate-50 border-slate-200/80 text-slate-900 shadow-slate-200/50'
              }`}>
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -left-10 -top-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.netBalance}</span>
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="text-3xl font-bold mb-4 font-mono tracking-tight" dir="ltr">
                  ${netBalance.toFixed(2)}
                </div>

                <div className={`grid grid-cols-2 gap-3 pt-3 border-t ${isDarkMode ? 'border-slate-700/50' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#10B981] flex items-center justify-center">
                      <ArrowDownRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.income}</div>
                      <div className="text-xs font-bold text-[#10B981] font-mono" dir="ltr">+${totalIncome.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-[#EF4444] flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.expense}</div>
                      <div className="text-xs font-bold text-[#EF4444] font-mono" dir="ltr">-${totalExpense.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => { setTransType('INCOME'); setShowAddTransactionModal(true); }}
                  className={`rounded-2xl p-3 flex flex-col items-center gap-2 transition-all shadow-md group active:scale-95 border ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-slate-200/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t.addIncome}</span>
                </button>

                <button
                  onClick={() => { setTransType('EXPENSE'); setShowAddTransactionModal(true); }}
                  className={`rounded-2xl p-3 flex flex-col items-center gap-2 transition-all shadow-md group active:scale-95 border ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-slate-200/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-rose-500/15 text-[#EF4444] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t.addExpense}</span>
                </button>

                <button
                  onClick={() => setShowAddDebtModal(true)}
                  className={`rounded-2xl p-3 flex flex-col items-center gap-2 transition-all shadow-md group active:scale-95 border ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700/60 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-slate-200/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-sky-500/15 text-[#38BDF8] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t.addDebt}</span>
                </button>
              </div>

              {/* Interactive Analytics & Donut / Categories Breakdown */}
              <div className={`rounded-2xl p-4 border shadow-md space-y-3 transition-colors ${
                isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{t.categoryDist}</span>
                  <span className="text-[#10B981] font-mono">Room DB Flow</span>
                </div>

                {categories.slice(0, 4).map((cat, idx) => {
                  const origCat = CATEGORIES_AR[idx];
                  const catTotal = transactions.filter(t => t.category === origCat && t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);
                  const percentage = totalExpense > 0 ? (catTotal / totalExpense) * 100 : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{cat}</span>
                        <span className="font-mono text-slate-400" dir="ltr">${catTotal.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Transactions Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.recentTx}</h3>
                  <button onClick={() => setActiveTab('analytics')} className="text-xs text-[#38BDF8] hover:underline">{t.viewAll}</button>
                </div>

                <div className="space-y-2.5">
                  {transactions.map(tx => (
                    <div key={tx.id} className={`rounded-2xl p-3.5 border flex items-center justify-between transition-all shadow-sm ${
                      isDarkMode ? 'bg-[#1E293B] border-slate-700/50 hover:border-slate-600' : 'bg-white border-slate-200 shadow-slate-200/40 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'INCOME' ? 'bg-emerald-500/15 text-[#10B981]' : 'bg-rose-500/15 text-[#EF4444]'}`}>
                          {tx.type === 'INCOME' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{tx.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>{tx.category}</span>
                            <span className="text-[10px] text-slate-400">{new Date(tx.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-sm font-bold font-mono ${tx.type === 'INCOME' ? 'text-[#10B981]' : 'text-[#EF4444]'}`} dir="ltr">
                          {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </div>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Debts Screen */}
          {activeTab === 'debts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.debtsTitle}</h3>
                <button
                  onClick={() => setShowAddDebtModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-medium transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addDebt}</span>
                </button>
              </div>

              {/* Segmented Control / Tabs */}
              <div className={`grid grid-cols-2 gap-2 p-1 rounded-2xl border ${isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                <button
                  onClick={() => setDebtTab('IM_OWED')}
                  className={`py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                    debtTab === 'IM_OWED' 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{t.imOwed}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-900/40 text-[10px] font-mono">${imOwedTotal.toFixed(0)}</span>
                </button>
                <button
                  onClick={() => setDebtTab('I_OWE')}
                  className={`py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                    debtTab === 'I_OWE' 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{t.iOwe}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-900/40 text-[10px] font-mono">${iOweTotal.toFixed(0)}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {debts.filter(d => d.type === debtTab).map(debt => (
                  <div key={debt.id} className={`rounded-2xl p-4 border transition-all shadow-sm ${
                    debt.isSettled 
                      ? isDarkMode ? 'bg-[#1E293B]/50 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
                      : isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-200 shadow-slate-200/40'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-[#38BDF8] flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{debt.personName}</div>
                          <div className="text-[10px] text-slate-400">Due: {new Date(debt.dueDate).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</div>
                        </div>
                      </div>
                      <div className="text-base font-bold font-mono text-[#38BDF8]" dir="ltr">${debt.amount.toFixed(2)}</div>
                    </div>

                    {debt.notes && <p className={`text-xs p-2.5 rounded-xl mb-3 ${isDarkMode ? 'text-slate-300 bg-slate-900/40' : 'text-slate-700 bg-slate-100'}`}>{debt.notes}</p>}

                    <div className={`flex items-center justify-between pt-2.5 border-t ${isDarkMode ? 'border-slate-700/50' : 'border-slate-100'}`}>
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${debt.isSettled ? 'bg-emerald-500/15 text-[#10B981]' : 'bg-amber-500/15 text-amber-400'}`}>
                        {debt.isSettled ? t.settled : t.unsettled}
                      </span>
                      <button
                        onClick={() => toggleDebtSettled(debt.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm ${
                          debt.isSettled 
                            ? isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{debt.isSettled ? t.cancelSettle : t.settleDebt}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.analyticsTitle}</h3>
              
              <div className={`rounded-2xl p-4 border shadow-md space-y-3 transition-colors ${
                isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{t.categoryDist}</span>
                  <span className="text-[#10B981]">Room DB Flow</span>
                </div>

                {categories.slice(0, 5).map((cat, idx) => {
                  const origCat = CATEGORIES_AR[idx];
                  const catTotal = transactions.filter(t => t.category === origCat && t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);
                  const percentage = totalExpense > 0 ? (catTotal / totalExpense) * 100 : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{cat}</span>
                        <span className="font-mono text-slate-400" dir="ltr">${catTotal.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={`rounded-2xl p-4 border flex items-center gap-3 shadow-md ${
                isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#10B981] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{t.dbSecurity}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.dbSecurityDesc}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <div className={`backdrop-blur-md border-t px-6 py-2.5 flex items-center justify-around shadow-2xl ${
          isDarkMode ? 'bg-[#1E293B]/95 border-slate-700/60' : 'bg-white/95 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#38BDF8]' : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t.homeNav}</span>
          </button>
          
          <button
            onClick={() => { setTransType('EXPENSE'); setShowAddTransactionModal(true); }}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 -mt-6 active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('debts')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'debts' ? 'text-[#38BDF8]' : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t.debtsNav}</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'analytics' ? 'text-[#38BDF8]' : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <PieChart className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t.analyticsNav}</span>
          </button>
        </div>

        {/* Home Indicator Bar if Phone Frame */}
        {isPhoneFrame && (
          <div className={`w-full pb-2 pt-1 flex items-center justify-center ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
            <div className={`w-32 h-1 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
          </div>
        )}

      </div>

      {/* Add Transaction Modal */}
      {showAddTransactionModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-[#1E293B] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">{t.newTxTitle}</h3>
              <button onClick={() => setShowAddTransactionModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">{t.txTitleLabel}</label>
                <input
                  type="text"
                  required
                  value={transTitle}
                  onChange={e => setTransTitle(e.target.value)}
                  placeholder="e.g. Internet Bill"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.amountLabel}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={transAmount}
                    onChange={e => setTransAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.typeLabel}</label>
                  <select
                    value={transType}
                    onChange={e => setTransType(e.target.value as any)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">{t.categoryLabel}</label>
                <select
                  value={transCategory}
                  onChange={e => setTransCategory(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {categories.map((c, idx) => <option key={c} value={CATEGORIES_AR[idx]}>{c}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTransactionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500 shadow-lg shadow-emerald-600/25"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Debt Modal */}
      {showAddDebtModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-[#1E293B] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">{t.newDebtTitle}</h3>
              <button onClick={() => setShowAddDebtModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddDebt} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">{t.personLabel}</label>
                <input
                  type="text"
                  required
                  value={debtPerson}
                  onChange={e => setDebtPerson(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500 ${
                    isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.amountLabel}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={debtAmount}
                    onChange={e => setDebtAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-sky-500 ${
                      isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.debtTypeLabel}</label>
                  <select
                    value={debtType}
                    onChange={e => setDebtType(e.target.value as any)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500 ${
                      isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="IM_OWED">I'm Owed</option>
                    <option value="I_OWE">I Owe</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">{t.notesLabel}</label>
                <input
                  type="text"
                  value={debtNotes}
                  onChange={e => setDebtNotes(e.target.value)}
                  placeholder="Optional notes..."
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500 ${
                    isDarkMode ? 'bg-[#0F172A] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDebtModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-medium hover:bg-sky-500 shadow-lg shadow-sky-600/25"
                >
                  {t.saveDebt}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
