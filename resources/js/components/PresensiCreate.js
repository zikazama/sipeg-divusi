import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PresensiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pegawai: [],
            opt_pegawai: [],
            opt_presensi: [
                { value: "hadir", label: "Hadir" },
                { value: "izin", label: "Izin" },
                { value: "sakit", label: "Sakit" }
            ],
            id_pegawai: "",
            jenis_presensi: "",
            keterangan: "",
            tanggal: new Date(),
            alert: null,
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewPresensi = this.handleCreateNewPresensi.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFieldPegawai(e){
        this.setState({id_pegawai:e.value})
    }

    handleFieldPresensi(e){
        this.setState({jenis_presensi:e.value})
    }

    handleFieldTanggal(e,date){
        this.setState({tanggal:date})
    }

    async componentDidMount() {
        await axios.get("/api/pegawai").then(response => {
            this.setState({
                pegawai: response.data
            });
        });
        this.state.pegawai.map((v, i) => {
            this.state.opt_pegawai.push({
                value: v.id_pegawai,
                label: v.nip+' - '+v.nama_pegawai
            });
        });
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
            >
                Presensi Berhasil Ditambahkan
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.props.history.push("/presensi/all");
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    handleCreateNewPresensi(event) {
        event.preventDefault();
        const presensi = {
            id_pegawai: this.state.id_pegawai,
            jenis_presensi: this.state.jenis_presensi,
            keterangan: this.state.keterangan,
            tanggal: this.formatDate(this.state.tanggal)
        };
        axios.post("/api/presensi/store", presensi).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                return this.goToHome();
            }
        });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Input Presensi</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewPresensi}>
                                    <div className="form-group">
                                        <label htmlFor="id_pegawai">
                                            Nama Pegawai
                                        </label>
                                        <Select
                                            name="id_pegawai"
                                           
                                            onChange={this.handleFieldPegawai.bind(this)}
                                            options={this.state.opt_pegawai}
                                        />
                                        {this.renderErrorFor("id_pegawai")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jenis_presensi">
                                            Presensi
                                        </label>
                                        <Select
                                            name="jenis_presensi"
                                           
                                            onChange={this.handleFieldPresensi.bind(this)}
                                            options={this.state.opt_presensi}
                                        />
                                        {this.renderErrorFor("jenis_presensi")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="keterangan">
                                            Keterangan
                                        </label>
                                        <textarea
                                            id="keterangan"
                                            className={`form-control ${
                                                this.hasErrorFor("keterangan")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="keterangan"
                                            value={this.state.keterangan}
                                            onChange={this.handleFieldChange}
                                        ></textarea>
                                        {this.renderErrorFor("keterangan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <br/>
                                        <DatePicker
                                            id="tanggal"
                                            name="tanggal"
                                            selected={this.state.tanggal}
                                            onChange={date =>
                                                this.setState({
                                                    tanggal: date
                                                })
                                            }
                                        />

                                        {this.renderErrorFor("tanggal")}
                                    </div>
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/presensi/all`}
                                    >
                                        Kembali
                                    </Link>
                                    <button className="btn btn-primary">
                                        Tambah
                                    </button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PresensiCreate;
