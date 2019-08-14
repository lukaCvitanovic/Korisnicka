import React, { Component } from "react";
import { navigate } from "gatsby";
import "../styles/prijavi_se_lay.css";
import Query from "../components/Login";
import Header from "../components/Header";

var qry = {};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {num: 0};
        this.myCallBack = this.myCallBack.bind(this);
        this.collectData = this.collectData.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    myCallBack(childData) {
        //https://medium.com/@ruthmpardee/passing-data-between-reac-components-103ad82ebd17
        if (this.state.num === 0) {
            qry = childData.allArticlesJson.edges[0].node.data;
        } 
    }

    collectData = () => {
        //const data = qry;
        const data = JSON.parse(localStorage.getItem('userData'));
        const state = this.props.location.state;
        const uname = document.querySelector('input.username').value;
        const pass = document.querySelector('input.password').value;
    
        const verdict = this.compare(uname, pass, data);
        console.log(verdict);
        console.log(uname)

        if(verdict) {
            var a = {before: this.props.location.pathname, user: uname};
            navigate(state.before, {state: a});
        }
        else {
            this.wrongEntry();
        }
    }

    compare = (uname, pass, users) => {
        var verdict = false;
        for(var i = 0; i<users.length; i++) {
            
            if((uname === users[i].uname) && (pass === users[i].pass)) {
                verdict = true;
            }
        }
    
        return verdict;
    }

    keypress = (event) => {
        if(event.key === 'Enter') {
            this.collectData();
        }
    }

    //TO DO metod koja stavlja crveni border na input ako nije dobar unos
    wrongEntry = () => {
        console.log(document.querySelector('input.username').getAttribute('id'));

        if(document.querySelector('input.username').getAttribute('id') === '' || document.querySelector('input.username').getAttribute('id') === null) {
            document.querySelector('input.username').setAttribute('id', 'wrongU');
            document.querySelector('input.password').setAttribute('id', 'wrongP');
            document.querySelector('div.error').setAttribute('id', 'show_div');
            document.querySelector('p.ertxt').setAttribute('id', 'show_p');
        }
    }

    checkUser = () => {
        if(window.history.state.a) {
            this.props.location.state = {before: window.history.state.a.before, user: window.history.state.a.user};
            qry = this.props.location.state;
            return true;
        }
    }

    componentDidMount() {
        document.title = "Prijavi se"
        const usern_input = document.getElementsByClassName("username")[0]
        usern_input.focus()
    }

    render() {
        var cond = this.checkUser();
        if(cond) {
            this.props.location.state = qry;
        }
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};
        console.log(data);

        return(
            <body className="body_log">
                <Header data={data} />
                <Query parentCallback={this.myCallBack} />
                <div className="site_log">
                    <main className="item_log main_log">
                        <div id="" class="error">
                            <p className="ertxt">Unjeli ste pogrešno ime ili lozinku</p>
                        </div>
                        <div className="login_form">
                            <input id="" className="username" placeholder="  Unesite korisničko ime" onKeyPress={this.keypress}/>
                            <input id="" className="password" type="password" placeholder="  Unesite Lozinku" onKeyPress={this.keypress}/>
                            <button className="login_btn" 
                                onClick={ () => { this.collectData(); }}>
                                Prijavi se
                            </button>
                        </div>
                    </main>
                </div>
            </body>
        );
    }
}

export default Login;

/*
    <Link className="login_btn_link" to={before}>
*/