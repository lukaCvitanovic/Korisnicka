import React, { Component } from "react";
import { navigate } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/reg_lay.css";
import ScrollButton from "../components/ScrollToTop";

class Register extends Component {
    checkPass1 = (event) => {
        if(event.key !== 'Enter') {
            this.checkPass(event.key, '');
        }
        else {
            this.storeData();
        }
    }

    checkPass2 = (event) => {
        if(event.key !== 'Enter') {
            this.checkPass('', event.key);
        }
        else {
            this.storeData();
        }
    }

    checkPass = (key1,key2) => {
        const pass = document.querySelector('input#pass').value;
        const passA = document.getElementById('passA').value;

        if(pass+key1 !== passA+key2 && document.querySelector('div.reg_wrong').getAttribute('id') === '') {
            document.querySelector('div.reg_wrong').setAttribute('id', 'show_reg');
            document.querySelector('div.site_reg').setAttribute('id', 'show_over');
        }
        else if(pass+key1 === passA+key2 && document.querySelector('div.reg_wrong').getAttribute('id') === 'show_reg') {
            document.querySelector('div.reg_wrong').setAttribute('id', '');
            document.querySelector('div.site_reg').setAttribute('id', '');
        }
    }

    storeData = () => {
        const uname = document.querySelector('input#uname').value;
        const pass = document.querySelector('input#pass').value;
        const adr = document.querySelector('input#adr').value;
        const ziro = document.querySelector('input#ziro').value;
        const name = document.querySelector('input#name').value;
        const sname = document.querySelector('input#sname').value;

        var userData = [];
        userData.push({uname: uname, pass: pass, adr: adr, ziro: ziro, name: name, sname: sname});

        localStorage.setItem('userData', JSON.stringify(userData));

        navigate('/', {user: uname});
    }

    keypress = (event) => {
        if(event.key === 'Enter') {
            this.storeData();
        }
    }

    componentDidMount() {
        document.title = "Registriraj se"
    }

    render() {
        const data = {page: this.props.location.pathname, 
                     user: this.props.location.state.user};

        return(
            <body>
                <div id="" className="site_reg">
                    <Header data={data} />
                    <main className="item main_reg">
                        <div className="reg_form">
                            <div className="form">
                                <div className="obavezno">
                                    <h2>Obavezno</h2>
                                    <div className="user_div">
                                        <p className="reg_label">Korisničko ime</p>
                                        <input id="uname" className="reg_input" onKeyPress={this.keypress}/>
                                    </div>
                                    <div className="pass_div">
                                        <p className="reg_label">Lozinka</p>
                                        <input id="pass" className="reg_input" type="password" onKeyPress={this.checkPass1}/>
                                    </div>
                                    <div className="pass_again_div">
                                        <p className="reg_label">Ponovite lozinku</p>
                                        <input id="passA" className="reg_input" type="password" onKeyPress={this.checkPass2}/>
                                        <div id="" className="reg_wrong">
                                            <p>Lozinke nisu iste</p>
                                            <p>Pokušajte ponovo</p>
                                        </div>
                                    </div>
                                    <div className="name_div">
                                        <p className="reg_label">Ime</p>
                                        <input id="name" className="reg_input" onKeyPress={this.keypress}/>
                                    </div>
                                    <div className="sname_div">
                                        <p className="reg_label">Prezime</p>
                                        <input id="sname" className="reg_input" onKeyPress={this.keypress}/>
                                    </div>
                                    <button id="btn2" className="reg_btn" onClick={ () => { this.storeData(); }}>
                                        Registriraj se
                                    </button>
                                </div>
                                <div className="dodatno">
                                    <h2>Dodatno</h2>
                                    <div className="adr_div">
                                        <p className="reg_label">Adresa</p>
                                        <input id="adr" className="reg_input" onKeyPress={this.keypress}/>
                                    </div>
                                    <div className="ziro_div">
                                        <p className="reg_label">Žiro račun</p>
                                        <input id="ziro" className="reg_input" onKeyPress={this.keypress}/>
                                    </div>
                                </div>
                            </div>
                            <button id="btn1" className="reg_btn" onClick={ () => { this.storeData(); }}>
                                Registriraj se
                            </button>
                        </div>
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
                    </main>
                    <Footer />
                </div>
            </body>
        );
    }
}

export default Register;