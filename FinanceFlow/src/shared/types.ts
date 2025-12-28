import z from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  type: z.enum(['receita', 'despesa']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const IncomeSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  date: z.string(),
  type: z.string(),
  value: z.number(),
  description: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Income = z.infer<typeof IncomeSchema>;

export const ExpenseSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  date: z.string(),
  category_id: z.number().nullable(),
  value: z.number(),
  description: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: Array<{
    name: string;
    total: number;
  }>;
}
