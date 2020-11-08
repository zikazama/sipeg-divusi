import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class LaporanIndex extends Component {
    constructor() {
        super();
        this.state = {
            pegawai: [],
            msg: null,
            type: null,
            flash: false,
            alert: null
        };
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    componentDidMount() {
        const month = this.props.match.params.month;
        const year = this.props.match.params.year;
        axios.get(`/api/laporan/${year}/${month}`).then(response => {
            this.setState({
                pegawai: response.data.hasil
            });
        });
    }

    confirmDelete(id) {
        const getAlert = () => {
            return(
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Hapus"
                cancelBtnText="Batalkan"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Anda yakin ingin menghapus ?"
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
            ></SweetAlert>)
        };
        this.setState({
            alert: getAlert()
        });
    }

    deleteItem(id) {
        axios.delete(`/api/pegawai/delete/${id}`).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                this.hideAlert();
                this.goToHome();
            }
        });
    }

    goToHome() {
        const getAlert = () => {
            return(
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Ok"
            >
                Pegawai sudah dihapus
            </SweetAlert>)
        };
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.componentDidMount();
        this.hideAlert();
    }

    render() {
        const { pegawai } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">Semua Laporan</div>
                            <div className="card-body">
                               
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th
                                                    width="50"
                                                    className="text-center"
                                                >
                                                    No
                                                </th>
                                                <th>NIP</th>
                                                <th>Nama Pegawai</th>
                                                <th>Fungsional</th>
                                                <th>Struktural</th>
                                                <th>Hadir</th>
                                                <th>Sakit</th>
                                                <th>Izin</th>
                                                <th>Alpa</th>
                                                <th>Total</th>

                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pegawai.map((p, i) => (
                                                <tr key={i}>
                                                    <td
                                                        width="50"
                                                        className="text-center"
                                                    >
                                                        {i + 1}
                                                    </td>
                                                    <td>{p.nip}</td>
                                                    <td>{p.nama_pegawai}</td>
                                                    <td>{p.nama_fungsional}</td>
                                                    <td>{p.nama_struktural}</td>
                                                    <td>{p.hadir}</td>
                                                    <td>{p.sakit}</td>
                                                    <td>{p.izin}</td>
                                                    <td>{p.alpa}</td>
                                                    <td>{p.total}</td>
                                                   
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <h4>Note: Total merupakan hari kerja dalam satu bulan (tidak termasuk hari libur)</h4>
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/laporan/form`}
                                    >
                                        Kembali
                                    </Link>
                                    {this.state.alert}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LaporanIndex;
