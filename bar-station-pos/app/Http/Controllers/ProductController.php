<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Ingredient;
use App\Services\ProductCatalogService;
use App\Services\RecipeManagementService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class ProductController extends Controller
{
    protected $catalogService;
    protected $recipeService;

    public function __construct(ProductCatalogService $catalogService, RecipeManagementService $recipeService)
    {
        $this->catalogService = $catalogService;
        $this->recipeService = $recipeService;
    }

    public function index(Request $request)
    {
        // Traemos los productos con su categoría y sus ingredientes (receta)
        $products = Product::with(['category', 'recipes.ingredient'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%");
            })
            ->orderBy('category_id')
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => Category::where('type', 'product')->get(),
            'ingredients' => Ingredient::where('is_active', true)->orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'sale_price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'ingredients' => 'nullable|array',
            'ingredients.*.id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:0.01',
        ]);

        try {
            // 1. Validar la lógica de la receta (Reglas de negocio)
            if (!empty($validated['ingredients'])) {
                $this->recipeService->validateRecipeData($validated['ingredients']);
            }

            // 2. Crear el producto y sincronizar la receta
            $this->catalogService->createProductWithRecipe($validated);

            return redirect()->route('products.index')->with('success', 'Producto y receta creados exitosamente.');
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
    }
}
