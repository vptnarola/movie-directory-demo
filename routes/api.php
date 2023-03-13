<?php

use App\Http\Controllers\API\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('logout', [UserController::class, 'logout']);


Route::get('movies/', [MovieController::class,'index']);
Route::group(['prefix' => 'movies', 'middleware' => ['can:isAdmin']], function() {
    Route::post('store', [MovieController::class,'store']);
    Route::post('update/{id}', [MovieController::class,'update']);
    Route::get('edit/{id}', [MovieController::class,'edit']);
    Route::delete('delete/{id}', [MovieController::class,'destroy']);
});
