<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\StudentController;

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
Route::get('/studentsdata', [StudentController::class, 'index']);
Route::post('/add-studentapi', [StudentController::class, 'store']);
Route::get('/edit-studentapi/{id}', [StudentController::class, 'edit']);
Route::put('/update-studentapi/{id}', [StudentController::class, 'updatest']);
Route::delete('delete-studentapi/{id}', [StudentController::class, 'destroy']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
