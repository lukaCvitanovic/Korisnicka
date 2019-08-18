import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollButton from "../components/ScrollToTop";
import { navigate } from "gatsby";
import "../styles/kos_lay.css";
import KosItem from "../components/KosItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var id = "";

class Kosarica extends Component {
    constructor(props) {
        super(props);
        this.notify = this.notify.bind(this)
        this.checkUser = this.checkUser.bind(this);
        this.mycallback = this.mycallback.bind(this);
        this.Kositems = this.Kositems.bind(this);
        this.calculate = this.calculate.bind(this);
        this.state = {price: 0, amount: 0, num: 0, kos_items: null, num_kos: 0};
    }

    mycallback = (childData) => {
        this.calculate(0);
    }

    Kositems_render = (list) => list.map(el => {
        var count = parseInt(localStorage.getItem('count'));
        if(count) {
            localStorage.setItem('count',String(count+1));
        }
        else {
            count = '1';
            localStorage.setItem('count', count);
        }    
    
        return(
            <KosItem data={el} time={count} parentCallback={this.mycallback} storage="kosarica" />
        );
    });
    
    Kositem_render = (item) => {
        var count = parseInt(localStorage.getItem('count'));
        if(count) {
            localStorage.setItem('count',String(count+1));
        }
        else {
            count = '1';
            localStorage.setItem('count', count);
        }    
    
        return(
            <KosItem data={item} time={count} parentCallback={this.mycallback} storage="kupi" />
        );
    }

    Kositems = (q) => {
        if(q === 0) {
            var data;
            if(localStorage.getItem('kosarica') !== '[]') {
                data = JSON.parse(localStorage.getItem('kosarica'));
                if(data !== []) {
                    const ret = this.Kositems_render(data);
                    id = "";
                    this.setState({kos_items: ret, num_kos: 1});
                }
                else {
                    id = "kos_empty";
                    this.setState({num_kos: 1});
                }
            }
            else if(localStorage.getItem('kupi') !== '[]') {
                data = JSON.parse(localStorage.getItem('kupi'));
                if(data !== []) {
                    const ret = this.Kositem_render(data);
                    id = "";
                    this.setState({kos_items: ret, num_kos: 1});
                }
                else {
                    id = "kos_empty";
                    this.setState({num_kos: 1});
                }
            }
            else {
                id = "kos_empty";
                this.setState({num_kos: 1});
            }
        }
    }

    checkUser = () => {
        if(window.history.state.a) {
            this.props.location.state = {before: window.history.state.a.before, user: window.history.state.a.user};
        }
        else {
            const a = {before: this.props.location.pathname, user: this.props.location.state.user};
            navigate('/prijavi_se', {state: {a},});
        }
    }

    removeAll = () => {
        const kositem = document.getElementsByClassName('kositem');
        if (kositem.length !== 0) {
            localStorage.setItem('kosarica', JSON.stringify([]));
            localStorage.setItem('kupi', JSON.stringify([]));
            for(var i=kositem.length-1;i>0;i--) {
                kositem[i].remove();
            }
            kositem[0].remove();
            this.calculate(0)
        }
    }

    calculate = (q) => {
        if(q === 0) {
            var data;
            var price;

            if(localStorage.getItem('kosarica') !== '[]') {
                data = JSON.parse(localStorage.getItem('kosarica'));

                price = 0;

                for(var i = 0; i<data.length; i++) {
                    price += parseInt(data[i].price);
                }

                if(data.length === 0) {
                    id = "kos_empty";
                    this.setState({price: price, amount: data.length, num: 1});
                }
                else {
                    id = "";
                    this.setState({price: price, amount: data.length, num: 1});
                }
            }
            else if(localStorage.getItem('kupi') !== '[]') {
                data = JSON.parse(localStorage.getItem('kupi'));
                price = parseInt(data.price);
                
                if(data.amount !== undefined) {
                    var amount = data.amount;

                    if(amount === 0) {
                        id = "kos_empty";
                        this.setState({price: price, amount: amount, num: 1});
                    }
                    else {
                        id = "";
                        this.setState({price: price, amount: amount, num: 1});
                    }

                    localStorage.setItem('kupi', JSON.stringify([]));
                }
                else {
                    if(!data.name) {
                        id = "kos_empty";
                        this.setState({price: price, amount: 1, num: 1});
                    }
                    else {
                        id = "";
                        this.setState({price: price, amount: 1, num: 1});
                    }
                }
            }
            else {
                id = "kos_empty";
                this.setState({price: "0,00", amount: 0, num: 1});
            }
        }
    }

    notify = () => {
        const kositem = document.getElementsByClassName('kositem');
        if (kositem.length !== 0) {
            this.removeAll()
            document.querySelector('div.notif').setAttribute('id', 'notif_show');
            setTimeout(function (){
                const notif = document.querySelector('div.notif')
                if (notif !== null) {
                    notif.setAttribute('id', '');
                }
            }, 3000);
        }
    }

    notif_exit = () => {
        document.querySelector('div.notif').setAttribute('id', '');
    }

    componentDidMount() {
        document.title = "Košarica"
    }

    render() {
        const data = {page: this.props.location.pathname, user: this.props.location.state.user};
        this.Kositems(this.state.num_kos);
        this.calculate(this.state.num);

        return(
            <body>
                <div className="site_kos">
                    <Header data={data} />
                    <main className="item main_prof">
                        <div className="div_kos">
                            <div className="kosarica">
                                <div className="cijena">
                                    <div className="price_label">
                                        <p className="bold">Ukupno:</p>
                                        <p className="kos_price">{this.state.price} Kn</p>
                                    </div>
                                    <button className="reg_btn" onClick={ () => {this.notify();}}>Kupi</button>
                                </div>
                                <div className="iznos_div">
                                    <p className="bold">Broj proizvoda: {this.state.amount}</p>
                                </div>
                                <button className="empty" onClick={ () => {this.removeAll();}}>Isprazni košaricu</button>
                                <div className="proizvodi">
                                    <p id={id} className="full">Košarica je prazna</p>
                                    {this.state.kos_items}
                                </div>
                            </div>
                            <div className="placanje">
                                <h2>Mogućnosti plaćanja</h2>
                                <div className="banka">
                                    <p className="bname">Zagrebačka Banka:</p>
                                    <p className="plac">Visa, MasterCard i Maestro do 12 rata beskamatno</p>
                                </div>
                                <div className="banka">
                                    <p className="bname">OTP Banka:</p>
                                    <p className="plac">Visa, MasterCard i Maestro do 12 rata beskamatno</p>
                                </div>
                                <div className="banka">
                                    <p className="bname">Erste Banka:</p>
                                    <p className="plac">Visa, Maestro i Maestro Plus do 12 rata beskamatno</p>
                                </div>
                                <div className="banka">
                                    <p className="bname">PBZ Banka:</p>
                                    <p className="plac">Visa i Maestro do 12 rata beskamatno</p>
                                </div>
                                <div className="banka">
                                    <p className="bname">RBA:</p>
                                    <p className="plac">MasterCard do 12 rata beskamatno</p>
                                </div>
                                <div className="banka">
                                    <p className="bname">PBZ Banka:</p>
                                    <p className="plac">Visa i Maestro do 12 rata beskamatno</p>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer data={data} />
                </div>
                <div id="" className="notif" onClick={ () => {this.notif_exit();}}>
                    <p>Kupnja obavljena</p>
                    <FontAwesomeIcon className="check" icon={['fas', 'check-circle']} size="2x" />
                </div>
                <ScrollButton scrollStepInPx="50" delayInMs="16.66" /> 
            </body>
        );
    }
}

export default Kosarica;