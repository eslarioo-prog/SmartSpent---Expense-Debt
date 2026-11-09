export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: number; // timestamp in millis
}

export interface Debt {
  id: number;
  personName: string;
  amount: number;
  type: 'IM_OWED' | 'I_OWE';
  dueDate: number; // timestamp in millis
  isSettled: boolean;
  notes: string;
}
