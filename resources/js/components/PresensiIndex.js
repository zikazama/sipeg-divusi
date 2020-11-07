import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class PresensiIndex extends Component {
    constructor() {
        super();
        this.state = {
            presensi: [],
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
        axios.get("/api/presensi").then(response => {
            this.setState({
                presensi: response.data
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
        axios.delete(`/api/presensi/delete/${id}`).then(response => {
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
                Presensi sudah dihapus
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
        const { presensi } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Semua Presensi</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary btn-sm mb-3"
                                    to="/presensi/create"
                                >
                                    Input Presensi
                                </Link>
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
                                                <th>Presensi</th>
                                                <th>Keterangan</th>
                                                <th>Tanggal</th>
                                                <th
                                                    width="200"
                                                    className="text-center"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {presensi.map((p, i) => (
                                                <tr key={i}>
                                                    <td
                                                        width="50"
                                                        className="text-center"
                                                    >
                                                        {i + 1}
                                                    </td>
                                                    <td>{p.nip}</td>
                                                    <td>{p.nama_pegawai}</td>
                                                    <td>{p.jenis_presensi}</td>
                                                    <td>{p.keterangan}</td>
                                                    <td>{p.tanggal}</td>
                                                    <td
                                                        width="200"
                                                        className="text-center"
                                                    >
                                                        <div className="btn-group">
                                                            <Link
                                                                className="btn btn-primary"
                                                                to={`/presensi/${p.id_presensi}`}
                                                            >
                                                                Detail
                                                            </Link>
                                                            <Link
                                                                className="btn btn-success"
                                                                to={`/presensi/edit/${p.id_presensi}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    this.confirmDelete(
                                                                        p.id_presensi
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default PresensiIndex;
