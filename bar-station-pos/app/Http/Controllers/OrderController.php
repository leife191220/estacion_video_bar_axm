<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Table;
use App\Models\Product;
use App\Models\Customer;
use App\Services\OrderDraftingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderDraftingService $orderService)
    {
        $this->orderService = $orderService;
    }

    // Muestra todas las mesas y cuentas abiertas
    public function index()
    {
        $tables = Table::with(['orders' => function($query) {
            $query->where('status', 'open')->with('details.product');
        }])->get();

        return Inertia::render('Orders/Index', ['tables' => $tables]);
    }

    // Abre una nueva cuenta
    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_id' => 'nullable|exists:tables,id',
            'customer_id' => 'nullable|exists:customers,id',
        ]);

        try {
            $table = isset($validated['table_id']) ? Table::find($validated['table_id']) : null;
            $this->orderService->openOrder(auth()->id(), $table, $validated['customer_id'] ?? null);

            return back()->with('success', 'Cuenta abierta exitosamente.');
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // Agrega un producto a la cuenta (Endpoint que también usará el bot de Telegram)
    public function addItem(Request $request, Order $order)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:255',
        ]);

        try {
            $product = Product::find($validated['product_id']);
            $this->orderService->addItem($order, $product, $validated['quantity'], $validated['notes']);

            return back()->with('success', 'Producto agregado a la cuenta.');
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
