export interface Member {
  id: string;
  name: string;
  email: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: Member[];
  createdAt: Date;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string; // member id
  splitAmong: string[]; // member ids
  date: Date;
  category: string;
  settled: boolean;
}

export interface Balance {
  memberId: string;
  memberName: string;
  balance: number; // positive = they are owed, negative = they owe
}

export interface Settlement {
  id: string;
  groupId: string;
  from: string; // member id
  to: string; // member id
  amount: number;
  settled: boolean;
  date: Date;
}