# 💰 تطبيق مصاريفي - مدير المال والديون (Expense & Debt Tracker)

تطبيق شخصي متطور لإدارة المصاريف والديون لأجهزة أندرويد مصمم بلغة **Kotlin** وباستخدام **Jetpack Compose** ومكتبة **Room Database** للتخزين المحلي الآمن، مع بنية برمجية نظيفة **Clean Architecture** ودعم كامل للوضع الداكن والفاتح (**Dynamic Light & Dark Theme**).

---

## ✨ المميزات الرئيسية (Core Features)

- **إدارة المصاريف والدخل**: تسجيل المعاملات المالية (دخل ومصاريف) مع تصنيفات متعددة وتحديث فوري للأرصدة.
- **إدارة الديون (Debt Tracker)**: متابعة الديون المتبادلة (فلوس ليا `IM_OWED` / فلوس عليا `I_OWE`) مع زر تسوية سريع.
- **هندسة نظيفة (Clean Architecture)**: فصل الطبقات (Data Layer, Domain Layer, Presentation Layer) لضمان قابلية الصيانة والتوسع.
- **تدفق بيانات تفاعلي (Reactive Streams)**: استخدام **Kotlin Coroutines & Flow** لتحديث الواجهات تلقائياً عند أي تعديل في قاعدة البيانات.
- **دعم الثيمات (Light & Dark Theme)**: تبديل سلس ومرن بين وضع النهار المريح ووضع الليل الراقي (Modern Premium Dark Dashboard).
- **إعلانات Google AdMob**: دمج جاهز لإعلانات البانر (`BannerAdView`) وإعلانات ملء الشاشة (`InterstitialAdManager`).
- **يعمل بدون إنترنت 100%**: خصوصية كاملة وحفظ محلي آمن عبر SQLite / Room Database.

---

## 📂 هيكل المجلدات (Folder Structure)

```text
app/src/main/java/com/example/expensetracker/
│
├── data/
│   ├── local/
│   │   ├── entity/          # Transaction.kt, Debt.kt
│   │   ├── dao/             # TransactionDao.kt, DebtDao.kt
│   │   ├── Converters.kt    # Type Converters for Room
│   │   └── AppDatabase.kt   # Room Database Singleton
│   └── repository/          # FinanceRepository.kt
│
├── presentation/
│   ├── viewmodel/           # ExpenseViewModel.kt, DebtViewModel.kt
│   ├── ui/
│   │   ├── screens/         # HomeScreen.kt, DebtScreen.kt, AboutScreen.kt
│   │   ├── components/      # BannerAdView.kt
│   │   └── dialogs/         # AddTransactionDialog.kt
│   └── theme/               # Theme.kt (Light & Dark)
│
└── utils/                   # InterstitialAdManager.kt
```

---

## 🛠️ متطلبات وإعداد بيئة التطوير (Development Setup)

للبدء في تطوير وتشغيل المشروع محلياً عبر **Android Studio**:

1. **المتطلبات الأساسية**:
   - تثبيت أحدث إصدار من **Android Studio** (Koala أو أحدث).
   - توفر **JDK 17** أو أعلى.
   - جهاز وهمي (Emulator) أو جهاز حقيقي يعمل بنظام Android 8.0 (API 26) كحد أدنى.

2. **خطوات التشغيل**:
   - استنساخ المستودع (Clone Repository):
     ```bash
     git clone https://github.com/your-username/expense-debt-tracker.git
     ```
   - فتح المشروع في Android Studio.
   - انتظار اكتمال مزامنة **Gradle** وتثبيت التبعيات تلقائياً:
     ```kotlin
     implementation("androidx.room:room-runtime:2.6.1")
     implementation("androidx.room:room-ktx:2.6.1")
     implementation("androidx.compose.material3:material3:1.2.0")
     implementation("com.google.android.gms:play-services-ads:23.0.0")
     ```
   - الضغط على زر **Run ▶** لتشغيل التطبيق على المحاكي.

---

## 📄 الترخيص (License)
هذا المشروع مرخص تحت رخصة Apache 2.0.
