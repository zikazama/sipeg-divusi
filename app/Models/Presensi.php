<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Presensi extends Model
{
    use HasFactory;

    protected $table = 'presensi';
    protected $fillable = ['id_pegawai','jenis_presensi','keterangan','tanggal'];
    protected $primaryKey = 'id_presensi';

    public function read_full(){
        $query = DB::table($this->table)->join('pegawai','pegawai.id_pegawai','=','presensi.id_presensi')
                ->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->get();
        return $query;
    }

    public function read_full_where($where){
        $query = DB::table($this->table)->join('pegawai','pegawai.id_pegawai','=','presensi.id_presensi')
                ->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->where($where)
                ->get();
        return $query;
    }
}
