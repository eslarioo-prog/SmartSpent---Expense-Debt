import React, { useState } from 'react';
import { Copy, Check, Code, FileCode, Database, Layers, Server } from 'lucide-react';

const KOTLIN_FILES = [
  {
    id: 'transaction',
    name: 'Transaction.kt (Entity)',
    path: 'com/example/expensetracker/data/local/entity/Transaction.kt',
    icon: FileCode,
    code: `package com.example.expensetracker.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "transactions")
data class Transaction(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val amount: Double,
    val type: String, // "INCOME" or "EXPENSE"
    val category: String,
    val date: Long // Timestamp in milliseconds
)`
  },
  {
    id: 'debt',
    name: 'Debt.kt (Entity)',
    path: 'com/example/expensetracker/data/local/entity/Debt.kt',
    icon: FileCode,
    code: `package com.example.expensetracker.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "debts")
data class Debt(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val personName: String,
    val amount: Double,
    val type: String, // "IM_OWED" or "I_OWE"
    val dueDate: Long, // Timestamp in milliseconds
    val isSettled: Boolean,
    val notes: String
)`
  },
  {
    id: 'transaction_dao',
    name: 'TransactionDao.kt (DAO)',
    path: 'com/example/expensetracker/data/local/dao/TransactionDao.kt',
    icon: Code,
    code: `package com.example.expensetracker.data.local.dao

import androidx.room.*
import com.example.expensetracker.data.local.entity.Transaction
import kotlinx.coroutines.flow.Flow

@Dao
interface TransactionDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTransaction(transaction: Transaction)

    @Update
    suspend fun updateTransaction(transaction: Transaction)

    @Delete
    suspend fun deleteTransaction(transaction: Transaction)

    @Query("SELECT * FROM transactions ORDER BY date DESC")
    fun getAllTransactions(): Flow<List<Transaction>>
}`
  },
  {
    id: 'debt_dao',
    name: 'DebtDao.kt (DAO)',
    path: 'com/example/expensetracker/data/local/dao/DebtDao.kt',
    icon: Code,
    code: `package com.example.expensetracker.data.local.dao

import androidx.room.*
import com.example.expensetracker.data.local.entity.Debt
import kotlinx.coroutines.flow.Flow

@Dao
interface DebtDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDebt(debt: Debt)

    @Update
    suspend fun updateDebt(debt: Debt)

    @Delete
    suspend fun deleteDebt(debt: Debt)

    @Query("SELECT * FROM debts ORDER BY dueDate ASC")
    fun getAllDebts(): Flow<List<Debt>>
}`
  },
  {
    id: 'app_database',
    name: 'AppDatabase.kt (RoomDatabase)',
    path: 'com/example/expensetracker/data/local/AppDatabase.kt',
    icon: Database,
    code: `package com.example.expensetracker.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.expensetracker.data.local.dao.DebtDao
import com.example.expensetracker.data.local.dao.TransactionDao
import com.example.expensetracker.data.local.entity.Debt
import com.example.expensetracker.data.local.entity.Transaction

@Database(entities = [Transaction::class, Debt::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun transactionDao(): TransactionDao
    abstract fun debtDao(): DebtDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "expense_debt_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}`
  },
  {
    id: 'admob_setup',
    name: 'AdMobSetup.kt (Gradle & Manifest)',
    path: 'app/build.gradle.kts & AndroidManifest.xml',
    icon: Layers,
    code: `// ==========================================
// 1. build.gradle.kts (Module :app)
// ==========================================
dependencies {
    // Google Mobile Ads SDK
    implementation("com.google.android.gms:play-services-ads:23.0.0")
}

// ==========================================
// 2. AndroidManifest.xml
// ==========================================
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <!-- Sample AdMob App ID: ca-app-pub-3940256099942544~3347511713 -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>
    </application>
</manifest>`
  },
  {
    id: 'banner_ad',
    name: 'BannerAdView.kt (Compose)',
    path: 'com/example/expensetracker/presentation/ui/components/BannerAdView.kt',
    icon: Code,
    code: `package com.example.expensetracker.presentation.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView

@Composable
fun BannerAdView(modifier: Modifier = Modifier) {
    AndroidView(
        modifier = modifier.fillMaxWidth(),
        factory = { context ->
            AdView(context).apply {
                setAdSize(AdSize.BANNER)
                // Test Banner Ad Unit ID
                adUnitId = "ca-app-pub-3940256099942544/6300978111"
                loadAd(AdRequest.Builder().build())
            }
        }
    )
}`
  },
  {
    id: 'interstitial_manager',
    name: 'InterstitialAdManager.kt',
    path: 'com/example/expensetracker/utils/InterstitialAdManager.kt',
    icon: Server,
    code: `package com.example.expensetracker.utils

import android.content.Context
import android.util.Log
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

class InterstitialAdManager(private val context: Context) {
    private var interstitialAd: InterstitialAd? = null
    private var isLoading = false

    fun loadAd() {
        if (interstitialAd != null || isLoading) return
        isLoading = true

        val adRequest = AdRequest.Builder().build()
        // Test Interstitial Ad Unit ID
        InterstitialAd.load(
            context,
            "ca-app-pub-3940256099942544/1033173712",
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                    isLoading = false
                    Log.d("AdMob", "Interstitial Ad loaded.")
                }

                override fun onAdFailedToLoad(error: LoadAdError) {
                    interstitialAd = null
                    isLoading = false
                    Log.d("AdMob", "Interstitial Ad failed to load: \${error.message}")
                }
            }
        )
    }

    fun showAd(activity: android.app.Activity, onAdDismissed: () -> Unit) {
        if (interstitialAd != null) {
            interstitialAd?.fullScreenContentCallback = object : com.google.android.gms.ads.FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    interstitialAd = null
                    onAdDismissed()
                    loadAd()
                }

                override fun onAdFailedToShowFullScreenContent(error: com.google.android.gms.ads.AdError) {
                    interstitialAd = null
                    onAdDismissed()
                }
            }
            interstitialAd?.show(activity)
        } else {
            onAdDismissed()
            loadAd()
        }
    }
}`
  },
  {
    id: 'expense_vm',
    name: 'ExpenseViewModel.kt',
    path: 'com/example/expensetracker/presentation/viewmodel/ExpenseViewModel.kt',
    icon: Server,
    code: `package com.example.expensetracker.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.expensetracker.data.local.entity.Transaction
import com.example.expensetracker.data.repository.FinanceRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class ExpenseViewModel(private val repository: FinanceRepository) : ViewModel() {

    val transactions: StateFlow<List<Transaction>> = repository.allTransactions
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val totalIncome: StateFlow<Double> = transactions
        .map { list -> list.filter { it.type == "INCOME" }.sumOf { it.amount } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    val totalExpense: StateFlow<Double> = transactions
        .map { list -> list.filter { it.type == "EXPENSE" }.sumOf { it.amount } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    val netBalance: StateFlow<Double> = combine(totalIncome, totalExpense) { income, expense ->
        income - expense
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    fun addTransaction(title: String, amount: Double, type: String, category: String) {
        viewModelScope.launch {
            repository.insertTransaction(Transaction(title = title, amount = amount, type = type, category = category, date = System.currentTimeMillis()))
        }
    }

    fun deleteTransaction(transaction: Transaction) {
        viewModelScope.launch {
            repository.deleteTransaction(transaction)
        }
    }
}`
  },
  {
    id: 'debt_vm',
    name: 'DebtViewModel.kt',
    path: 'com/example/expensetracker/presentation/viewmodel/DebtViewModel.kt',
    icon: Server,
    code: `package com.example.expensetracker.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.expensetracker.data.local.entity.Debt
import com.example.expensetracker.data.repository.FinanceRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class DebtViewModel(private val repository: FinanceRepository) : ViewModel() {

    val debts: StateFlow<List<Debt>> = repository.allDebts
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val imOwedTotal: StateFlow<Double> = debts
        .map { list -> list.filter { it.type == "IM_OWED" && !it.isSettled }.sumOf { it.amount } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    val iOweTotal: StateFlow<Double> = debts
        .map { list -> list.filter { it.type == "I_OWE" && !it.isSettled }.sumOf { it.amount } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0.0)

    fun toggleDebtSettled(debt: Debt) {
        viewModelScope.launch {
            repository.updateDebt(debt.copy(isSettled = !debt.isSettled))
        }
    }

    fun deleteDebt(debt: Debt) {
        viewModelScope.launch {
            repository.deleteDebt(debt)
        }
    }
}`
  },
  {
    id: 'home_screen',
    name: 'HomeScreen.kt (Compose)',
    path: 'com/example/expensetracker/presentation/ui/screens/HomeScreen.kt',
    icon: Code,
    code: 'package com.example.expensetracker.presentation.ui.screens\\n\\nimport androidx.compose.foundation.layout.*\\nimport androidx.compose.foundation.lazy.LazyColumn\\nimport androidx.compose.foundation.lazy.items\\nimport androidx.compose.material.icons.Icons\\nimport androidx.compose.material.icons.filled.Add\\nimport androidx.compose.material3.*\\nimport androidx.compose.runtime.*\\nimport androidx.compose.ui.Modifier\\nimport androidx.compose.ui.graphics.Color\\nimport androidx.compose.ui.unit.dp\\nimport com.example.expensetracker.data.local.entity.Transaction\\nimport com.example.expensetracker.presentation.viewmodel.ExpenseViewModel\\nimport java.util.Locale\\n\\n@OptIn(ExperimentalMaterial3Api::class)\\n@Composable\\nfun HomeScreen(viewModel: ExpenseViewModel, onAddClick: () -> Unit) {\\n    val transactions by viewModel.transactions.collectAsState()\\n    val totalIncome by viewModel.totalIncome.collectAsState()\\n    val totalExpense by viewModel.totalExpense.collectAsState()\\n    val netBalance by viewModel.netBalance.collectAsState()\\n\\n    Scaffold(\\n        topBar = { TopAppBar(title = { Text("المصاريف الشخصية") }) },\\n        floatingActionButton = {\\n            FloatingActionButton(onClick = onAddClick) {\\n                Icon(Icons.Default.Add, contentDescription = "إضافة")\\n            }\\n        }\\n    ) { paddingValues ->\\n        LazyColumn(modifier = Modifier.fillMaxSize().padding(paddingValues).padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {\\n            item {\\n                Card(modifier = Modifier.fillMaxWidth()) {\\n                    Column(modifier = Modifier.padding(16.dp)) {\\n                        Text("الرصيد الصافي", style = MaterialTheme.typography.bodyMedium)\\n                        Text("\\$${String.format(Locale.US, \\"%.2f\\", netBalance)}", style = MaterialTheme.typography.headlineLarge)\\n                        Spacer(modifier = Modifier.height(8.dp))\\n                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {\\n                            Text("الدخل: +\\$${totalIncome}", color = Color(0xFF2E7D32))\\n                            Text("المصاريف: -\\$${totalExpense}", color = Color(0xFFC62828))\\n                        }\\n                    }\\n                }\\n            }\\n            items(transactions, key = { it.id }) { tx ->\\n                Card(modifier = Modifier.fillMaxWidth()) {\\n                    Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {\\n                        Column {\\n                            Text(tx.title, style = MaterialTheme.typography.bodyLarge)\\n                            Text(tx.category, style = MaterialTheme.typography.bodySmall)\\n                        }\\n                        Text("\\${if (tx.type == \\"INCOME\\") \\"+\\" else \\"-\\"}\\${tx.amount}", color = if (tx.type == \\"INCOME\\") Color(0xFF2E7D32) else Color(0xFFC62828))\\n                    }\\n                }\\n            }\\n        }\\n    }\\n}'
  },
  {
    id: 'debt_screen',
    name: 'DebtScreen.kt (Compose)',
    path: 'com/example/expensetracker/presentation/ui/screens/DebtScreen.kt',
    icon: Code,
    code: 'package com.example.expensetracker.presentation.ui.screens\\n\\nimport androidx.compose.foundation.layout.*\\nimport androidx.compose.foundation.lazy.LazyColumn\\nimport androidx.compose.foundation.lazy.items\\nimport androidx.compose.material3.*\\nimport androidx.compose.runtime.*\\nimport androidx.compose.ui.Modifier\\nimport androidx.compose.ui.graphics.Color\\nimport androidx.compose.ui.unit.dp\\nimport com.example.expensetracker.presentation.viewmodel.DebtViewModel\\n\\n@OptIn(ExperimentalMaterial3Api::class)\\n@Composable\\nfun DebtScreen(viewModel: DebtViewModel) {\\n    val debts by viewModel.debts.collectAsState()\\n    val imOwedTotal by viewModel.imOwedTotal.collectAsState()\\n    val iOweTotal by viewModel.iOweTotal.collectAsState()\\n\\n    Scaffold(\\n        topBar = { TopAppBar(title = { Text("إدارة الديون") }) }\\n    ) { paddingValues ->\\n        LazyColumn(modifier = Modifier.fillMaxSize().padding(paddingValues).padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {\\n            item {\\n                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {\\n                    Card(modifier = Modifier.weight(1f)) {\\n                        Column(modifier = Modifier.padding(16.dp)) {\\n                            Text("فلوس ليا", style = MaterialTheme.typography.labelSmall)\\n                            Text("\\${imOwedTotal}", color = Color(0xFF2E7D32))\\n                        }\\n                    }\\n                    Card(modifier = Modifier.weight(1f)) {\\n                        Column(modifier = Modifier.padding(16.dp)) {\\n                            Text("فلوس عليا", style = MaterialTheme.typography.labelSmall)\\n                            Text("\\${iOweTotal}", color = Color(0xFFC62828))\\n                        }\\n                    }\\n                }\\n            }\\n            items(debts, key = { it.id }) { debt ->\\n                Card(modifier = Modifier.fillMaxWidth()) {\\n                    Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween) {\\n                        Column {\\n                            Text(debt.personName, style = MaterialTheme.typography.bodyLarge)\\n                            Text(if (debt.isSettled) "تم السداد" else "غير مسدد", color = if (debt.isSettled) Color(0xFF2E7D32) else Color(0xFFE65100))\\n                        }\\n                        TextButton(onClick = { viewModel.toggleDebtSettled(debt) }) {\\n                            Text(if (debt.isSettled) "إلغاء التسوية" else "تسوية")\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n    }\\n}'
  },
  {
    id: 'add_dialog',
    name: 'AddTransactionDialog.kt',
    path: 'com/example/expensetracker/presentation/ui/dialogs/AddTransactionDialog.kt',
    icon: Code,
    code: `package com.example.expensetracker.presentation.ui.dialogs

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddTransactionDialog(onDismiss: () -> Unit, onSave: (String, Double, String, String) -> Unit) {
    var title by remember { mutableStateOf("") }
    var amount by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("EXPENSE") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("إضافة معاملة") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("العنوان") })
                OutlinedTextField(value = amount, onValueChange = { amount = it }, label = { Text("المبلغ") })
            }
        },
        confirmButton = {
            Button(onClick = {
                val amt = amount.toDoubleOrNull() ?: 0.0
                if (title.isNotBlank() && amt > 0) {
                    onSave(title, amt, type, "أخرى")
                    onDismiss()
                }
            }) { Text("حفظ") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("إلغاء") } }
    )
}`
  },
  {
    id: 'about_screen',
    name: 'AboutScreen.kt (Compose)',
    path: 'com/example/expensetracker/presentation/ui/screens/AboutScreen.kt',
    icon: Code,
    code: `package com.example.expensetracker.presentation.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AboutScreen() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("عن التطبيق") }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(16.dp))
                Surface(
                    modifier = Modifier.size(96.dp),
                    shape = MaterialTheme.shapes.extraLarge,
                    color = MaterialTheme.colorScheme.primaryContainer
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            Icons.Default.Info,
                            contentDescription = "أيقونة التطبيق",
                            modifier = Modifier.size(48.dp),
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                }
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "مصاريفي - مدير المال والديون",
                    style = MaterialTheme.typography.titleLarge
                )
                Text(
                    text = "الإصدار v1.0.0",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.outline
                )
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Text(
                        text = "تطبيق بسيط لتتبع مصاريفك اليومية، تنظيم ميزانيتك، وإدارة الديون بدون إنترنت.",
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(16.dp)
                    )
                }
            }

            item {
                Text(
                    text = "المميزات الرئيسية",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.fillMaxWidth()
                )
            }

            val features = listOf(
                "تسجيل سريع وسهل للمعاملات (دخل ومصاريف)",
                "إدارة الديون والتزامات الأفراد (فلوس ليا وفلوس عليا)",
                "تحليلات مالية ورسوم واضحة لتوزيع المصاريف",
                "يعمل بدون إنترنت 100% وبسرعة عالية عبر Room DB"
            )

            items(features.size) { index ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Icon(
                            Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = features[index],
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Lock,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp),
                        tint = MaterialTheme.colorScheme.outline
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "تم التثبيت والأمان محلياً على جهازك - جميع البيانات خاصة بك بالكامل.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.outline
                    )
                }
            }
        }
    }
}`
  }
];

export function KotlinCodeViewer() {
  const [selectedFileId, setSelectedFileId] = useState(KOTLIN_FILES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedFile = KOTLIN_FILES.find(f => f.id === selectedFileId) || KOTLIN_FILES[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col lg:flex-row h-[750px]">
      {/* Sidebar File List */}
      <div className="w-full lg:w-80 bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-200">Room & Data Layer</h3>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Kotlin</span>
        </div>
        <div className="p-2 space-y-1 overflow-y-auto flex-1">
          {KOTLIN_FILES.map(file => {
            const Icon = file.icon;
            const isSelected = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`w-full text-right px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 text-sm ${
                  isSelected 
                    ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div className="truncate text-left flex-1" dir="ltr">
                  <div className="truncate font-mono text-xs">{file.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 truncate">{file.name.split(' ').slice(1).join(' ')}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Code Editor Panel */}
      <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400" dir="ltr">
            <span className="text-emerald-400">src/main/java/</span>
            <span>{selectedFile.path}</span>
          </div>
          <button
            onClick={() => handleCopy(selectedFile.code, selectedFile.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            {copiedId === selectedFile.id ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الكود</span>
              </>
            )}
          </button>
        </div>

        <div className="flex-1 p-6 overflow-auto font-mono text-xs leading-relaxed bg-[#0d1117] text-slate-200 select-text" dir="ltr">
          <pre className="whitespace-pre">
            <code>{selectedFile.code}</code>
          </pre>
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Clean Architecture Data Layer (Room + Flow + Coroutines)</span>
          <span className="text-emerald-400 font-mono">Kotlin 2.0 / Room 2.6+</span>
        </div>
      </div>
    </div>
  );
}
