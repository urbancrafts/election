<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollingUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'uniqueid',
        'polling_unit_id',
        'ward_id',
        'lga_id',
        'uniquewardid',
        'polling_unit_number',
        'polling_unit_name',
        // 'ward_name',
        // 'lga_id',
        'polling_unit_description',
        'lat',
        'long',
        'entered_by_user',
        'date_entered',
        'user_ip_address',
    ];

    protected $table = 'polling_unit';
    protected $casts = [ 
        'uniqueid' => 'integer', 
        
        //'branch_id' => 'integer',
    ];
    protected $primaryKey = 'uniqueid';
    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    // ];

 public function wards(){
    return $this->belongsTo(Ward::class, 'ward_id', 'uniqueid');
 }

 public function result(){
    return $this->hasMany(AnnoucedPUResult::class, 'polling_unit_uniqueid', 'uniqueid');
 }
 
}
