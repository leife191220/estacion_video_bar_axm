<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuario Administrador de prueba
        User::updateOrCreate(
            ['email' => 'admin@barstation.com'],
            [
                'name' => 'Admin Bar Station',
                'password' => Hash::make('password123'),
            ]
        );

        // Aquí luego descomentaremos el CsvImportSeeder cuando lo conectemos con Excel
        // $this->call([
        //     CsvImportSeeder::class,
        // ]);
    }
}
