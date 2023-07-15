<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = [
        'uniqueid',
        'ward_id',
        'ward_name',
        'lga_id',
        'ward_description',
        'entered_by_user',
        'date_entered',
        'user_ip_address',
    ];

    protected $table = 'ward';
    protected $casts = [ 
        'uniqueid' => 'integer', 
        
        //'branch_id' => 'integer',
    ];
    protected $primaryKey = 'uniqueid';
    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    // ];

 public function lga(){
    return $this->belongsTo(LocalGovernment::class, 'lga_id', 'uniqueid');
 }

 public function polling_unit(){
    return $this->hasMany(PollingUnit::class, 'ward_id', 'uniqueid');
 }
}
