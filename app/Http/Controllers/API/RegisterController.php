<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use App\Models\UserVerification;
use App\Models\AdminWalletSettings;
use App\Models\UserWallet;
use App\Models\VoucherCode;
use App\Models\VoucherVerification;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\DateTimeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Validator;
   
class RegisterController extends BaseController
{
    /**
    * Register api
    *
    * @return \Illuminate\Http\Response
    */

    use AuthenticatesUsers;

    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'referrer_id' => 'nullable',
            //'referrer_code' => 'nullable',
            'email' => 'required|email',
            'gender' => 'required',
            'gender_interest' => 'required',
            'country' => 'required',
            'state' => 'nullable',
            'city' => 'nullable',
            'country_code' => 'required',
            'phone' => 'required',
            'password' => 'required|min:6',
            
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   /************************************************
        $input = $request->all();
        if($input['role'] == 1){
        $input['role'] = 1; // Super Admin role identification
        }else if($input['role'] == 2){
        $input['role'] = 2; // Admin role identification
        }else if($input['role'] == 3){
        $input['role'] = 3; // Merchant role identification
        }
    ************************************************/
    //query user db table to check if email and phone alread exist    
    $checkEmail = User::where('email', $request->input('email'))->get();
    $checkPhone = User::where('phone', $request->input('phone'))->get();

      if(count($checkEmail) > 0){//if query count is greater than zero
        return $this->showErrorMsg('Email address already exists', 'Error');
      }else if(count($checkPhone) > 0){
        return $this->showErrorMsg('Phone number already exists', 'Error');
      }else{
        //insert query
        $input['password'] = bcrypt($input['password']);
        $create_user = User::create($input);
        $success['token'] =  $create_user->createToken('MyApp')->accessToken;
        $success['id'] =  $create_user->id;
        $success['name'] = $create_user->name;
        $success['email'] =  $create_user->email;
        $success['phone'] =  $create_user->phone;
        $success['age'] =  $create_user->age;
        $success['country'] =  $create_user->country;
        $success['state'] =  $create_user->state;
        $success['city'] =  $create_user->city;
        $success['country_code'] =  $create_user->country_code;
        $success['img_1'] =  $create_user->img_1;
        $success['verified'] =  $create_user->verified;
        $success['verified_img'] =  $create_user->verified_img;
        $success['gender'] =  $create_user->gender;
        $success['gender_interest'] =  $create_user->gender_interest;
        $success['referrer_id'] =  $create_user->referrer_id;
        $success['role']  =  $create_user->role;
        $success['user_type'] = $create_user->user_type;
        $success['subscribed'] =  $create_user->subscribed;
        $success['status'] = $create_user->status;

        Storage::makeDirectory('public/img/users/'.$create_user->id, 0775);
        Storage::makeDirectory('public/img/users/'.$create_user->id.'/profile', 0775);
        Storage::makeDirectory('public/img/users/'.$create_user->id.'/post', 0775);
        Storage::makeDirectory('public/img/users/'.$create_user->id.'/story', 0775);
        //Storage::makeDirectory('storage/'.$user->email , 0775);
        //Storage::makeDirectory('/app/users/'.$user->id.'/store', 0775);
        //Storage::makeDirectory('/app/users/'.$user->id.'/profile' , 0775);
        
        EmailController::signupVerification($create_user);//Initiaze mail service

        return $this->sendResponse($success, 'Account created successfully.');
      }
}


public function promo_code_register(Request $request){
  $input = $request->all();
  $validator = Validator::make($input, [
      //'referrer_id' => 'nullable',
      'promo_code' => 'required',
      'email' => 'required|email',
      'gender' => 'required',
      'gender_interest' => 'required',
      'country' => 'required',
      'state' => 'nullable',
      'city' => 'nullable',
      'country_code' => 'required',
      'phone' => 'required',
      'password' => 'required|min:6',
      
  ]);

  if($validator->fails()){
      return $this->sendError('Validation Error.', $validator->errors());       
  }

  $voucher_check = VoucherCode::getByPromoCode($request->input('promo_code'));
  $referrer = User::where('username', $request->input('promo_code'))->get();
  if($voucher_check == false || count($referrer) < 1){
    return $this->showErrorMsg('Invalid code entered!', 'Error');
  }else{

    $voucher_count = VoucherVerification::where('bonus_code', $voucher_check[0]->bonus_code)->get();

    if($voucher_check[0]->subscriber_range < count($voucher_count)){
     
      $checkEmail = User::where('email', $request->input('email'))->get();
      $checkPhone = User::where('phone', $request->input('phone'))->get();
  
        if(count($checkEmail) > 0){//if query count is greater than zero
          return $this->showErrorMsg('Email address already exists', 'Error');
        }else if(count($checkPhone) > 0){
          return $this->showErrorMsg('Phone number already exists', 'Error');
        }else{
          //insert query
          $input['password'] = bcrypt($input['password']);
          $input['referrer_id'] = $referrer[0]->id;
          $create_user = User::create($input);
          $success['token'] =  $create_user->createToken('MyApp')->accessToken;
          $success['id'] =  $create_user->id;
          $success['name'] = $create_user->name;
          $success['email'] =  $create_user->email;
          $success['phone'] =  $create_user->phone;
          $success['age'] =  $create_user->age;
          $success['country'] =  $create_user->country;
          $success['state'] =  $create_user->state;
          $success['city'] =  $create_user->city;
          $success['country_code'] =  $create_user->country_code;
          $success['img_1'] =  $create_user->img_1;
          $success['verified'] =  $create_user->verified;
          $success['verified_img'] =  $create_user->verified_img;
          $success['gender'] =  $create_user->gender;
          $success['gender_interest'] =  $create_user->gender_interest;
          $success['referrer_id'] =  $create_user->referrer_id;
          $success['role']  =  $create_user->role;
          $success['user_type'] = $create_user->user_type;
          $success['subscribed'] =  $create_user->subscribed;
          $success['status'] = $create_user->status;
  
          Storage::makeDirectory('public/img/users/'.$create_user->id, 0775);
          Storage::makeDirectory('public/img/users/'.$create_user->id.'/profile', 0775);
          Storage::makeDirectory('public/img/users/'.$create_user->id.'/post', 0775);
          //Storage::makeDirectory('storage/'.$user->email , 0775);
          //Storage::makeDirectory('/app/users/'.$user->id.'/store', 0775);
          //Storage::makeDirectory('/app/users/'.$user->id.'/profile' , 0775);
          
          EmailController::signupVerification($create_user);//Initiaze mail service
          
           $insert = new VoucherVerification;
           $insert->uid = $create_user->id;
           $insert->bonus_code = $voucher_check[0]->bonus_code;
           $insert->save();

           $insert_user_wallet = new UserWallet;
           $insert_user_wallet->uid = $create_user->id;
           $insert_user_wallet->balance = $voucher_check[0]->coin_amoun;
           $insert_user_wallet->save();

          return $this->sendResponse($success, 'Account created successfully.');
        }


    }else{
      return $this->showErrorMsg('The limit of the promo code voucher has been reached, please go to signup.', 'Error'); 
    }

  }

}
  

//OTP authentication api endpoin
  public function confirm_otp(Request $request){
    $input = $request->all();
    $validator = Validator::make($input, [
        'uid' => 'required',
        'otp_code' => 'required',
        
    ]);

    if($validator->fails()){
        return $this->sendError('Validation Error.', $validator->errors());       
    }

    //$verify = UserVerification::where()
      /*****************************************
      $uid = $request->input('uid');
      $code = $request->input('otp_code');
      $verificationCheck = UserVerification::where(function($p) use($uid, $code){
        $p->where('uid', '=', $uid);
        $p->where('email_code', '=', $code);
       })->get();

       ***************************************/
      $verificationCheck = UserVerification::getSingleEmailCode($request->input('uid'), $request->input('otp_code'));
      //$uid = $request->input('uid');
      //$code = $request->input('otp_code');
      /***************************************
      $verificationCheck = UserVerification::where(function($p) use($uid, $code){
        $p->where('uid', '=', $uid);
        $p->where('email_code', '=', $code);
       })->first();

       **************************************/

       if(!$verificationCheck){
        $result = 'Oops! Incorrect token';
        return $this->showErrorMsg($result, 'Error');  
       }else if(DateTimeController::currentTime() > $verificationCheck->email_token_time){

        $result = 'Oops! Token expired';
        return $this->showErrorMsg($result, 'Error');
       }else{

        $updateOTP = UserVerification::updateToken($request->input('uid'), $request->input('otp_code'));
        
       //select all from AdminWalletSettings table
        $admin_wallet = AdminWalletSettings::all();

        $user = User::where('id', $request->input('uid'))->get();
        //insert into userWallet a user free signup coin allocation
        $check_balance = UserWallet::where('uid', $user[0]->id)->get();
        if(count($check_balance) > 0){
        $new_balance = $check_balance[0]->balance + $admin_wallet[0]->free_signup_coin;
        $update_wallet = UserWallet::where('uid', $user[0]->id)->update(['balance' => $new_balance]);
        }else{
        $user_wallet = new UserWallet;
        $user_wallet->uid = $user[0]->id;
        $user_wallet->balance = $admin_wallet[0]->free_signup_coin;//set free_signup_coin value from AdminWalletSettings table as user coin balance
        $user_wallet->save();
        }
        $update_user = User::where('id', $request->input('uid'))->update(['status' => 'Active']);
        //call userWelcome static method to push a new signup welcome mail
        EmailController::userWelcome($user);//Initiaze mail service

        return $this->sendResponse($updateOTP, 'otp verification is succesful.');

       }

  }
    /**
    * Login api
    *
    * @return \Illuminate\Http\Response
    */
    public function login(Request $request)
    {
        $this->validate($request, ['loginId' => 'required', 'password' => 'required|min:6']);
        
        $credential = ['email' => $request->loginId, 'password' => $request->password];

        $credential2 = ['phone' => $request->loginId, 'password' => $request->password];

        if(Auth::attempt($credential) || Auth::attempt($credential2)){ 
            $user = Auth::user(); 
            $status = User::where('id', $user->id)->update(['loggedIn' => 1]);
            
                //session_start();
                $success['loggedIn'] = true;
                $success['token'] =  $user->createToken('MyApp')-> accessToken;
                $success['id'] =  $user->id;
                $success['name'] = $user->name;
                $success['phone'] = $user->phone;
                $success['email'] =  $user->email;
                $success['age'] =  $user->age;
                $success['country'] =  $user->country;
                $success['state'] =  $user->state;
                $success['city'] =  $user->city;
                $success['country_code'] =  $user->country_code;
                $success['img_1'] =  $user->img_1;
                $success['verified'] =  $user->verified;
                $success['verified_img'] =  $user->verified_img;
                $success['gender'] =  $user->gender;
                $success['gender_interest'] =  $user->gender_interest;
                $success['referrer_id'] =  $user->referrer_id;
                $success['role']  =  $user->role;
                $success['user_type'] = $user->user_type;
                $success['subscribed'] =  $user->subscribed;
                $success['status'] = $user->status;
                //$success['isActive'] = $user->isActive;

       // setcookie("user_id", $_SESSION['user_id'], strtotime( '+30 days' ), "/", "", "", TRUE);
		//setcookie("name", $_SESSION['name'], strtotime( '+30 days' ), "/", "", "", TRUE);
		//setcookie("phone", $_SESSION['phone'], strtotime( '+30 days' ), "/", "", "", TRUE);
		//setcookie("email", $_SESSION['role'], strtotime( '+30 days' ), "/", "", "", TRUE);
		//setcookie("role", $_SESSION['role'], strtotime( '+30 days' ), "/", "", "", TRUE);

                return $this->sendResponse($success, 'User login successfully.');
            

           
         } else{ 
            return $this->showErrorMsg('Invalid login credentials', 'Error');
        } 
    }




    public function logout($request)
    {
        session_start();
        unset($_SESSION['user_id']);
        unset($_SESSION['token']);
        unset($_SESSION['username']);
        unset($_SESSION['email']);
        unset($_SESSION['status']);
        unset($_SESSION['role']);
        session_destroy();
        
        if(User::where('id', $request)->update(['status' => 0])){
            $status = 0;
        }
        $success['status'] = $status;

        return $this->sendResponse($success, 'successfully logged out.');
    }

     public function activateUsers($request){

     }

     public function deactivateUsers($request){
     
     }
    
}