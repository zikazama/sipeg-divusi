import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import PegawaiIndex from "./PegawaiIndex";
import PegawaiCreate from "./PegawaiCreate";
import PegawaiShow from "./PegawaiShow";
import PegawaiEdit from "./PegawaiEdit";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={PegawaiIndex}/>
                        <Route path='/create' component={PegawaiCreate}/>
                        <Route path='/pegawai/edit/:id_pegawai' component={PegawaiEdit}/>
                        <Route path='/pegawai/:id_pegawai' component={PegawaiShow}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));