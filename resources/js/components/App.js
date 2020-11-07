import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import PegawaiIndex from "./PegawaiIndex";
import PegawaiCreate from "./PegawaiCreate";
import PegawaiShow from "./PegawaiShow";
import PegawaiEdit from "./PegawaiEdit";
import PresensiIndex from "./PresensiIndex";
import PresensiCreate from "./PresensiCreate";
import PresensiShow from "./PresensiShow";
import PresensiEdit from "./PresensiEdit";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={PegawaiIndex}/>
                        <Route path='/pegawai/create' component={PegawaiCreate}/>
                        <Route path='/pegawai/edit/:id_pegawai' component={PegawaiEdit}/>
                        <Route path='/pegawai/:id_pegawai' component={PegawaiShow}/>
                        <Route path='/presensi/all' component={PresensiIndex}/>
                        <Route path='/presensi/create' component={PresensiCreate}/>
                        <Route path='/presensi/edit/:id_presensi' component={PresensiEdit}/>
                        <Route path='/presensi/:id_presensi' component={PresensiShow}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));