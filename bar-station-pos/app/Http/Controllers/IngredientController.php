<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Category;
use App\Models\Supplier;
use App\Services\StockMovementService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class IngredientController extends Controller
{
    protected $stockService;

    public function __construct(StockMovementService $stockService)
    {
        $this->stockService = $stockService;
    }

    public function index(Request $request)
    {
        $ingredients = Ingredient::with('category')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Ingredients/Index', [
            'ingredients' => $ingredients,
            'filters' => $request->only('search')
        ]);
    }

    // Método exclusivo para registrar compras/entradas de inventario
    public function addStock(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0.01',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'reason' => 'required|string|max:255',
        ]);

        try {
            // Usamos el servicio estricto para modificar el stock y dejar huella en el Kardex
            $this->stockService->recordMovement(
                $ingredient,
                $validated['quantity'],
                'purchase',
                $validated['reason'],
                auth()->id() // El usuario que está registrando la compra
            );

            return back()->with('success', "Se agregaron {$validated['quantity']} {$ingredient->unit_of_measure} al stock de {$ingredient->name}.");
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
