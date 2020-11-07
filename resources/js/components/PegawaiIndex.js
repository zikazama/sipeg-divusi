import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class PegawaiIndex extends Component {
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
        axios.get("/api/pegawai").then(response => {
            this.setState({
                pegawai: response.data
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
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Semua Pegawai</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary btn-sm mb-3"
                                    to="/create"
                                >
                                    Tambah Pegawai
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
                                                <th>Fungsional</th>
                                                <th>Struktural</th>
                                                <th
                                                    width="200"
                                                    className="text-center"
                                                >
                                                    Action
                                                </th>
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
                                                    <td
                                                        width="200"
                                                        className="text-center"
                                                    >
                                                        <div className="btn-group">
                                                            <Link
                                                                className="btn btn-primary"
                                                                to={`/pegawai/${p.id_pegawai}`}
                                                            >
                                                                Detail
                                                            </Link>
                                                            <Link
                                                                className="btn btn-success"
                                                                to={`/pegawai/edit/${p.id_pegawai}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    this.confirmDelete(
                                                                        p.id_pegawai
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

export default PegawaiIndex;
