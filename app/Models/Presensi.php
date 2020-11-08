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
        $query = DB::table($this->table)->join('pegawai','pegawai.id_pegawai','=','presensi.id_pegawai')
                ->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->get();
        return $query;
    }

    public function read_full_where($where){
        $query = DB::table($this->table)->join('pegawai','pegawai.id_pegawai','=','presensi.id_pegawai')
                ->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->where($where)
                ->get();
        return $query;
    }

    public function hadir($year,$month,$id_pegawai){
        $query = DB::table($this->table)->where('jenis_presensi','=','hadir')
                ->where('tanggal','like',"$year-$month%")
                ->where('id_pegawai','=',$id_pegawai)
                ->count();
        return $query;
    }

    public function sakit($year,$month,$id_pegawai){
        $query = DB::table($this->table)->where('jenis_presensi','=','sakit')
                ->where('tanggal','like',$year.'-'.$month.'%')
                ->where('id_pegawai','=',$id_pegawai)
                ->count();
        return $query;
    }

    public function izin($year,$month,$id_pegawai){
        $query = DB::table($this->table)->where('jenis_presensi','=','izin')
                ->where('tanggal','like',$year.'-'.$month.'%')
                ->where('id_pegawai','=',$id_pegawai)
                ->count();
        return $query;
    }
}
