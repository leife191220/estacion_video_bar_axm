<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use App\Services\ExpenseTrackingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    protected $expenseService;

    public function __construct(ExpenseTrackingService $expenseService)
    {
        $this->expenseService = $expenseService;
    }

    public function index()
    {
        $expenses = Expense::with(['category', 'user'])->orderByDesc('expense_date')->paginate(15);
        $categories = Category::where('type', 'expense')->get();

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:100',
        ]);

        $this->expenseService->recordExpense(
            auth()->id(),
            $validated['description'],
            $validated['amount'],
            $validated['category_id']
        );

        return back()->with('success', 'Gasto registrado correctamente.');
    }
}
