<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalGovernment extends Model
{
    use HasFactory;

    protected $fillable = [
        'uniqueid',
        'lga_id',
        'lga_name',
        'state_id',
        'lga_description',
        'entered_by_user',
        'date_entered',
        'user_ip_address',
    ];

    protected $table = 'lga';
    protected $casts = [ 
        'uniqueid' => 'integer', 
        
        //'branch_id' => 'integer',
    ];
    protected $primaryKey = 'uniqueid';
    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    // ];

 public function states(){
    return $this->belongsTo(State::class, 'state_id', 'state_id');
 }

 public function wards(){
    return $this->hasMany(Ward::class, 'lga_id', 'uniqueid');
 }

}
