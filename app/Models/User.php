<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Savings;
use App\Models\airtimePuchase;

class User extends Authenticatable implements JWTSubject
{
    //use HasApiTokens, HasFactory, Notifiable;
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function savings()
    {
        return $this->hasMany(Savings::class);
    }

    public function airtimepurchased()
    {
        return $this->hasMany(airtimePuchase::class);
    }

    public static function load_user_assoc_data($uid){
        $data = self::where('id', $uid)->get();
        $array_data = array();
        if(count($data) > 0){
           
           $result['profile'] = self::where('id', $data[0]->id)->get();
           $result['savings'] = Savings::where('user_id', $data[0]->id)->get();
           $result['airtime_purchased'] = airtimePuchase::get_record_by_user($data[0]->id);
           array_push($array_data, $result);
           
            return $array_data; 
        }else{
            return false;
        }
    }
}
