<?php

use App\Http\Controllers\PegawaiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/pegawai', [PegawaiController::class, 'index']);
Route::post('/pegawai/store', [PegawaiController::class, 'store']);
Route::get('/pegawai/edit/{id}', [PegawaiController::class, 'getPegawai']);
Route::get('/pegawai/{id}', [PegawaiController::class ,'getPegawai']);
Route::put('/pegawai/{id}', [PegawaiController::class, 'update']);
Route::delete('/pegawai/delete/{id}', [PegawaiController::class,'delete']);

Route::get('/presensi', [PresensiController::class, 'index']);
Route::post('/presensi/store', [PresensiController::class, 'store']);
Route::get('/presensi/edit/{id}', [PresensiController::class, 'getPresensi']);
Route::get('/presensi/{id}', [PresensiController::class ,'getPresensi']);
Route::put('/presensi/{id}', [PresensiController::class, 'update']);
Route::delete('/presensi/delete/{id}', [PresensiController::class,'delete']);
