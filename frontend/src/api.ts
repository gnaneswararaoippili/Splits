import axios from 'axios';
import { Group, Expense } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// AUTH
export async function signup(email: string, password: string, name: string) {
  try {
    const res = await api.post('/auth/signup', { email, password, name });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data || 'Signup failed');
  }
}

export async function signin(email: string, password: string) {
  try {
    const res = await api.post('/auth/signin', { email, password });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data || 'Signin failed');
  }
}

// GROUPS
export async function fetchGroups(): Promise<Group[]> {
  const res = await api.get('/groups');
  return res.data;
}
export async function createGroup(data: Omit<Group, 'id' | 'createdAt'>): Promise<Group> {
  const res = await api.post('/groups', data);
  return res.data;
}
export async function updateGroup(id: number, data: Partial<Group>): Promise<Group> {
  const res = await api.put(`/groups/${id}`, data);
  return res.data;
}
export async function deleteGroup(id: number): Promise<void> { await api.delete(`/groups/${id}`); }

// EXPENSES
export async function fetchGroupExpenses(groupId: number): Promise<Expense[]> {
  const res = await api.get(`/expenses/group/${groupId}`);
  return res.data;
}
export async function createExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
  const res = await api.post('/expenses', data);
  return res.data;
}
export async function updateExpense(id: number, data: Partial<Expense>): Promise<Expense> {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data;
}
export async function deleteExpense(id: number): Promise<void> { await api.delete(`/expenses/${id}`); }
