import { Expense, Member, Balance } from '../types';

export const calculateBalances = (expenses: Expense[], members: Member[]): Balance[] => {
  const balances: { [memberId: string]: number } = {};
  
  // Initialize balances
  members.forEach(member => {
    balances[member.id] = 0;
  });

  expenses.forEach(expense => {
    if (expense.settled) return;
    
    const splitAmount = expense.amount / expense.splitAmong.length;
    
    // The person who paid gets credited
    balances[expense.paidBy] += expense.amount;
    
    // Everyone who should pay gets debited
    expense.splitAmong.forEach(memberId => {
      balances[memberId] -= splitAmount;
    });
  });

  return members.map(member => ({
    memberId: member.id,
    memberName: member.name,
    balance: Math.round(balances[member.id] * 100) / 100
  }));
};

export const getSettlementSuggestions = (balances: Balance[]) => {
  const debtors = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);
  const creditors = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);
  
  const suggestions = [];
  let i = 0, j = 0;
  
  while (i < debtors.length && j < creditors.length) {
    const debt = Math.abs(debtors[i].balance);
    const credit = creditors[j].balance;
    const amount = Math.min(debt, credit);
    
    if (amount > 0.01) {
      suggestions.push({
        from: debtors[i].memberId,
        fromName: debtors[i].memberName,
        to: creditors[j].memberId,
        toName: creditors[j].memberName,
        amount: Math.round(amount * 100) / 100
      });
    }
    
    debtors[i].balance += amount;
    creditors[j].balance -= amount;
    
    if (Math.abs(debtors[i].balance) < 0.01) i++;
    if (Math.abs(creditors[j].balance) < 0.01) j++;
  }
  
  return suggestions;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};