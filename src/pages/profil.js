import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/prof_lay.css";
import { navigate } from "gatsby";

class Profil extends Component {
    constructor(props) {
        super(props);
        this.checkUser = this.checkUser.bind(this);
    }
    
    returnUserData = (user) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
    
        for(var i = 0;i<userData.length;i++) {
            if(user === userData[i].uname)
            return userData[i];
        }
        
        return null
    }

    checkUser = () => {
        if(window.history.state) {
            this.props.location.state = {before: window.history.state.before, user: window.history.state.user};
        }
        else {
            const a = {before: this.props.location.pathname, user: this.props.location.state.user};
            navigate('/prijavi_se', {state: a});
        }
    }

    componentDidMount() {
        document.title = "Profil"
    }

    render() {
        this.checkUser();
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};
        
        var userData = this.returnUserData(window.history.state.user);
        if(userData === null) {
            userData = {uname: "admin", name: "luka", sname: "cvi", adr: "don", ziro: "123"};
            const a = {before: this.props.location.pathname, user: this.props.location.state.user};
            navigate('/prijavi_se', {state: a});
        }

        return(
            <body>
                <div className="site_prof">
                    <Header data={data} />
                    <main className="item main_prof">
                        <div className="prof_form">
                            <h2 id="naslov">Korisnički podatci</h2>
                            <div className="podatci">
                                <div className="obavezno">
                                    <div id="user_div" className="txt_cont">
                                        <p className="reg_label">Korisničko ime: </p>
                                        <p className="prof_label">{userData.uname}</p>
                                    </div>
                                    <div id="name_div" className="txt_cont">
                                        <p className="reg_label">Ime: </p>
                                        <p className="prof_label">{userData.name}</p>
                                    </div>
                                    <div id="sname_div" className="txt_cont">
                                        <p className="reg_label">Prezime: </p>
                                        <p className="prof_label">{userData.sname}</p>
                                    </div>
                                </div>
                                <div className="dodatno">
                                    <div id="adr_div" className="txt_cont">
                                        <div className="cont">
                                            <p className="reg_label">Adresa: </p>
                                            <p className="prof_label">{userData.adr}</p>
                                        </div>
                                    </div>
                                    <div id="ziro_div" className="txt_cont">
                                        <div className="cont">
                                            <p className="reg_label">Žiro račun: </p>
                                            <p className="prof_label">{userData.ziro}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </body>
        );
    }
}

export default Profil;