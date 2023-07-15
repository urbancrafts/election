<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\LocalGovernment;
use App\Models\Ward;
use App\Models\PollingUnit;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\API\BaseController as BaseController;

class ApiController extends BaseController
{
    

    public function fetch_lga_list(){
        $list = LocalGovernment::all();

        if(count($list) > 0){
           return $this->sendResponse($list, 'LGA list fetched successfully.');
        }else{
           return $this->showErrorMsg('There is no LGA record available to fetch.', 'Error');
        }
   }


   public function get_ward_list(Request $request){

       $data = $request->only('lga_id');
       $validator = Validator::make($data, [
           'lga_id' => 'required|integer'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->messages()], 422);
       }

       $lga_list = LocalGovernment::where('uniqueid', $request->lga_id)->get();
       
       if(count($lga_list) > 0){
           $ward = $lga_list[0]->wards()->get();
           if(count($ward) > 0){
          return $this->sendResponse($ward, 'Ward list fetched successfully.');
           }else{
           return $this->showErrorMsg('There is no ward under this LGA.', 'Error');
           }
       }else{
          return $this->showErrorMsg('There is no LGA record available to fetch.', 'Error');
       }
  }


  public function get_polling_unit_list(Request $request){

   $data = $request->only('ward_id');
   $validator = Validator::make($data, [
       'ward_id' => 'required|integer'
   ]);

   //Send failed response if request is not valid
   if ($validator->fails()) {
       return response()->json(['error' => $validator->messages()], 422);
   }

   $ward_list = Ward::where('uniqueid', $request->ward_id)->get();
   
   if(count($ward_list) > 0){
       $polling_unit = $ward_list[0]->polling_unit()->get();
       if(count($polling_unit) > 0){
      return $this->sendResponse($polling_unit, 'Polling unit list fetched successfully.');
       }else{
       return $this->showErrorMsg('There is no polling unit under this ward.', 'Error');
       }
   }else{
      return $this->showErrorMsg('There is no Ward record available to fetch.', 'Error');
   }
}


public function get_polling_unit_result(Request $request){

   $data = $request->only('polling_unit_id');
   $validator = Validator::make($data, [
       'polling_unit_id' => 'required|integer'
   ]);

   //Send failed response if request is not valid
   if ($validator->fails()) {
       return response()->json(['error' => $validator->messages()], 422);
   }

   $polling_unit_list = PollingUnit::where('uniqueid', $request->polling_unit_id)->get();
   
   if(count($polling_unit_list) > 0){
       $result = $polling_unit_list[0]->result()->get();
       if(count($result) > 0){
      return $this->sendResponse($result, 'Result fetched for this polling unit successfully.');
       }else{
       return $this->showErrorMsg('There are no results for this polling.', 'Error');
       }
   }else{
      return $this->showErrorMsg('There are no records available to fetch.', 'Error');
   }
}


public function get_lga_result(Request $request){

    $data = $request->only('lga_id');
    $validator = Validator::make($data, [
        'lga_id' => 'required|integer'
    ]);
 
    //Send failed response if request is not valid
    if ($validator->fails()) {
        return response()->json(['error' => $validator->messages()], 422);
    }

    $result = DB::table('lga')->where('lga.uniqueid', '=', $request->lga_id)
        ->join('ward', 'lga.uniqueid', '=', 'ward.lga_id')
        ->join('polling_unit', 'ward.uniqueid', '=', 'polling_unit.ward_id')
          ->join('announced_pu_results', 'polling_unit.uniqueid', '=', 'announced_pu_results.polling_unit_uniqueid')
          //->sum('announced_pu_results.party_score');
          ->select('announced_pu_results.party_abbreviation', DB::raw('SUM(announced_pu_results.party_score) as score'))
          ->groupBy('announced_pu_results.party_abbreviation')
        //->join('product_images', 'product.id', '=', 'product_images.product_id')
       
        ->get();

    // $lga_list = LocalGovernment::where('uniqueid', $request->lga_id)->get();
 
    // $polling_unit_list = PollingUnit::where('uniqueid', $request->polling_unit_id)->get();
    
    if($result){
        // $result = $lga_list[0]->wards()->get()[0]->polling_unit()->get()[0]->result()->get();
        // if(count($result) > 0){
       return $this->sendResponse($result, 'Result fetched for this LGA successfully.');
        // }else{
        // return $this->showErrorMsg('There are no results for this LGA.', 'Error');
        // }
    }else{
       return $this->showErrorMsg('There are no records available to fetch.', 'Error');
    }
 }

    
}



