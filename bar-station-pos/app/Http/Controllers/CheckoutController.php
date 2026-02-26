<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\CheckoutService;
use Illuminate\Http\Request;
use Exception;

class CheckoutController extends Controller
{
    protected $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
    }

    // Procesa el pago de una cuenta abierta
    public function store(Request $request, Order $order)
    {
        $validated = $request->validate([
            'payment_method' => 'required|string|in:Efectivo,Nequi,Tarjeta,Transferencia',
        ]);

        try {
            $sale = $this->checkoutService->processPayment(
                $order,
                $validated['payment_method'],
                auth()->id()
            );

            return redirect()->route('orders.index')->with('success', "Pago registrado correctamente. Ticket #{$sale->id}");
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
