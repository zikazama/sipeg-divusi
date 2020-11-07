<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $data_fungsional = [
            [
                'nama_fungsional' => 'Engineer'
            ],
            [
                'nama_fungsional' => 'Administrasi'
            ],
            [
                'nama_fungsional' => 'Support'
            ]
        ];

        $data_struktural = [
            [
                'nama_struktural' => 'Manager'
            ],
            [
                'nama_struktural' => 'Team Leader'
            ],
            [
                'nama_struktural' => 'Staff'
            ]
        ];

        DB::table('fungsional')->insert($data_fungsional);
        DB::table('struktural')->insert($data_struktural);
        // \App\Models\User::factory(10)->create();
    }
}
