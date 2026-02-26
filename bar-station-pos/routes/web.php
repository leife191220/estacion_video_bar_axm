<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\DailyClosureController;
use App\Http\Controllers\ChecklistController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    // 1. Catálogo e Inventario
    Route::resource('products', ProductController::class);
    Route::resource('ingredients', IngredientController::class);
    Route::post('/ingredients/{ingredient}/add-stock', [IngredientController::class, 'addStock'])->name('ingredients.add-stock');

    // 2. Servicio y Mesas
    Route::resource('orders', OrderController::class)->only(['index', 'store']);
    Route::post('/orders/{order}/add-item', [OrderController::class, 'addItem'])->name('orders.add-item');

    // 3. Facturación
    Route::post('/orders/{order}/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // 4. Finanzas
    Route::resource('expenses', ExpenseController::class)->only(['index', 'store']);
    Route::resource('closures', DailyClosureController::class)->only(['index', 'store']);

    // 5. Operativo
    Route::resource('checklists', ChecklistController::class)->only(['index', 'store']);
});

require __DIR__.'/auth.php';
