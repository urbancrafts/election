<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;


Route::get('fetch_lga_list', [ApiController::class, 'fetch_lga_list']);
Route::post('get_ward_list', [ApiController::class, 'get_ward_list']);
Route::post('get_polling_unit_list', [ApiController::class, 'get_polling_unit_list']);
Route::post('get_polling_unit_result', [ApiController::class, 'get_polling_unit_result']);
Route::post('get_lga_result', [ApiController::class, 'get_lga_result']);





// Route::group(['middleware' => ['jwt.verify']], function() {
//     Route::post('logout', [ApiController::class, 'logout']);
//     Route::post('get_user', [ApiController::class, 'get_user']);
//     Route::post('view_user_recored', [ApiController::class, 'view_user_data']);
//     Route::get('savings', [SavingsController::class, 'index']);
//     Route::get('savings/{id}', [SavingsController::class, 'show']);
//     Route::post('create_savings', [SavingsController::class, 'store']);
//     Route::post('buy_airtime', [AirtimeController::class, 'buy_airtime']);
//     Route::put('update_savings/{savings}',  [SavingsController::class, 'update']);
//     Route::delete('delete/{product}',  [SavingsController::class, 'destroy']);
// });


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
