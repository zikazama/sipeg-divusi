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

        
        $pegawai_m = new Pegawai();
          $pegawai = \App\Models\Pegawai::create();

          $tahun = date('y');
          $fungsional = strlen((string)$validatedData['id_fungsional']) == 1 ? '0'.$validatedData['id_fungsional'] : $validatedData['id_fungsional'] ;
          $struktural = strlen((string)$validatedData['id_struktural']) == 1 ? '0'.$validatedData['id_struktural'] : $validatedData['id_struktural'] ;
          $nip_cari = (int)$tahun.$fungsional;
        //   $cari = $pegawai_m->read_max_nip([
        //       ['nip','like',"$nip_cari%"]
        //   ]);
        //   if($cari == null){
        //       $nip_baru = (int)$nip_cari.'0001';
        //   } else {
        //       $nip_before = (int)$cari->nip;
        //       $nip_baru = $nip_before + 1;
        //   }
        $kumpulan_nip = [];
        $cari = $pegawai_m->read_max_all();
        if($cari == null){
            $nip_baru = (int)$nip_cari.'0001';
        } else {
            foreach($cari as $data){
                $data = json_decode(json_encode($data), true);
                $nip_push = substr($data['nip'],4);
                array_push($kumpulan_nip,$nip_push);
            }
            rsort($kumpulan_nip);
            if(strlen((string)$kumpulan_nip[0]) == 1){
                $nip_before = (int)$nip_cari.'000'.$kumpulan_nip[0];
            } else if (strlen((string)$kumpulan_nip[0]) == 2){
                $nip_before = (int)$nip_cari.'00'.$kumpulan_nip[0];
            } else if (strlen((string)$kumpulan_nip[0]) == 3){
                $nip_before = (int)$nip_cari.'0'.$kumpulan_nip[0];
            } else if (strlen((string)$kumpulan_nip[0]) == 4){
                $nip_before = (int)$nip_cari.$kumpulan_nip[0];
            } else {
                $nip_before = (int)$nip_cari.'0000';
            }
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
