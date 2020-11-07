<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/pegawai', 'app');
Route::view('/pegawai/edit/{id}', 'app');
Route::view('/pegawai/{id}', 'app');
Route::view('/presensi', 'app');
Route::view('/presensi/edit/{id}', 'app');
Route::view('/presensi/{id}', 'app');
Route::view('/', 'app');
Route::view('/{path}', 'app');
