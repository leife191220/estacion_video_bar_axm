<?php

namespace App\Services;

use App\Models\Product;

class InventoryDeductionService
{
    protected $stockService;

    public function __construct(StockMovementService $stockService)
    {
        $this->stockService = $stockService;
    }

    /**
     * Calcula y deduce los insumos basados en la receta de un producto vendido.
     */
    public function deductFromRecipe(Product $product, int $quantitySold, int $userId, string $reference = 'Venta POS'): void
    {
        // Cargamos la receta
        $product->loadMissing('recipes.ingredient');

        foreach ($product->recipes as $recipe) {
            $ingredient = $recipe->ingredient;

            // Cantidad a descontar (Ej: 30ml * 2 mojitos = 60ml)
            $totalToDeduct = -($recipe->quantity * $quantitySold); // Negativo porque es salida

            // Delegamos el movimiento al servicio especializado
            $this->stockService->recordMovement(
                $ingredient,
                $totalToDeduct,
                'sale',
                "Descargo por venta de: {$product->name} (Ref: {$reference})",
                $userId
            );
        }
    }
}
