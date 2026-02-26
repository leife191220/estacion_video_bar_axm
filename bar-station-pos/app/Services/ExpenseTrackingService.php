<?php

namespace App\Services;

use App\Models\Expense;

class ExpenseTrackingService
{
    public function recordExpense(int $userId, string $description, float $amount, ?int $categoryId = null): Expense
    {
        return Expense::create([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'description' => $description,
            'amount' => $amount,
            'expense_date' => now()->toDateString(),
        ]);
    }
}
