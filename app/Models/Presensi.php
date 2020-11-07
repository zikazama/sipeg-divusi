<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presensi extends Model
{
    use HasFactory;

    protected $table = 'presensi';
    protected $fillable = ['id_pegawai','jenis_presensi','keterangan','tanggal'];
    protected $primaryKey = 'id_presensi';
}
