<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Pegawai;

class PegawaiController extends Controller
{
    public function index(){
        $pegawai = new Pegawai;
        $hasil = $pegawai->read_full();
        return $hasil->toJson();
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'nama_pegawai' => 'required',
            'id_fungsional' => 'required',
            'id_struktural' => 'required',
          ]);

        //   $project = \App\Models\Pegawai::create([
        //     'nip' => $validatedData['nip'],
        //     'nama_pegawai' => $validatedData['nama_pegawai'],
        //     'id_fungsional' => $validatedData['id_fungsional'],
        //     'id_struktural' => $validatedData['id_struktural'],
        //   ]);
        $pegawai_m = new Pegawai();
          $pegawai = \App\Models\Pegawai::create();

          $tahun = date('y');
          $fungsional = strlen((string)$validatedData['id_fungsional']) == 1 ? '0'.$validatedData['id_fungsional'] : $validatedData['id_fungsional'] ;
          $struktural = strlen((string)$validatedData['id_struktural']) == 1 ? '0'.$validatedData['id_struktural'] : $validatedData['id_struktural'] ;
          $nip_cari = (int)$tahun.$fungsional.$struktural;
          $cari = $pegawai_m->read_max_nip([
              ['nip','like',"$nip_cari%"]
          ]);
          if($cari == null){
              $nip_baru = (int)$nip_cari.'0001';
          } else {
              $nip_before = (int)$cari->nip;
              $nip_baru = $nip_before + 1;
          }

          $pegawai->nip = $nip_baru;
          $pegawai->nama_pegawai = $validatedData['nama_pegawai'];
          $pegawai->id_fungsional = $validatedData['id_fungsional'];
          $pegawai->id_struktural = $validatedData['id_struktural'];
          $pegawai->save();

          $msg = [
              'success' => true,
              'message' => 'Pegawai created successfully!'
          ];
   
          return response()->json($msg);
    }

    public function getPegawai($id_pegawai){
        $pegawai = new Pegawai();
        $hasil = $pegawai->read_full_where([['id_pegawai', '=' ,$id_pegawai]]);
        return $hasil->toJson();
    }

    public function update(Request $request, $id_pegawai)
    {
        $validatedData = $request->validate([
            'nama_pegawai' => 'required',
          ]);
 
        $pegawai = \App\Models\Pegawai::find($id_pegawai);
        $pegawai->nama_pegawai = $validatedData['nama_pegawai'];
        $pegawai->save();
 
        $msg = [
            'success' => true,
            'message' => 'Pegawai updated successfully'
        ];
 
        return response()->json($msg);
    }
 
    public function delete($id_pegawai)
    {
        $pegawai = \App\Models\Pegawai::find($id_pegawai);
        if(!empty($pegawai)){
            $pegawai->delete();
            $msg = [
                'success' => true,
                'message' => 'Pegawai deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Pegawai deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
