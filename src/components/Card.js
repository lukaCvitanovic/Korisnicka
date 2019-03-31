import React, { Component } from "react";
import {Link, navigate} from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Card extends Component {
    constructor(props) {
        super(props);
        this.buy = this.buy.bind(this);
        this.cart = this.cart.bind(this);
    }

    cart = () => {
        const item = {pic: this.props.src,
                     name: this.props.text.name,
                     price: this.props.text.price};

        var kosarica = JSON.parse(localStorage.getItem('kosarica'));
        if(kosarica) {
            kosarica.push(item);
            localStorage.setItem('kosarica', JSON.stringify(kosarica));
        }
        else {
            localStorage.setItem('kosarica', JSON.stringify([item]));
        }
        console.log("dodano");
    }
    
    buy = () => {
        const item = {pic: this.props.src,
            name: this.props.text.name, 
            price: this.props.text.price};
            
        const a = this.props.a;
        console.log(item);

        localStorage.setItem('kupi', JSON.stringify(item));
        navigate('/kosarica', {state: {a},});
    }

    render() {
        return(
                <div class="card">
                    <Link className="card_link" to="/about" >
                        <div className="cilckable">
                            <Img fixed={this.props.src} />
                            <p className="name">{this.props.text.name}</p>
                            <p className="price">{this.props.text.price}Kn</p>
                            <p className="payment">mogućnost plačanja do {this.props.text.payment} rata</p>
                        </div>
                    </Link>
                    <div className="buttons">
                        <button className="buynow" onClick={ () => {this.buy();} }>
                            <p>Kupi odmah</p>
                        </button>
                        <button className="cart" onClick={ () => { this.cart(); }}>
                            <FontAwesomeIcon icon={['fas', 'cart-plus']} />
                            <p>Dodaj u košaricu</p>
                        </button>
                    </div>
                </div>
        );
    }
}

export default Card;

/*
<Img fixed={props.src} />
                <p className="card_descript">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <p className="price">6548</p>
                <p className="payment">Lorem ipsum dolor</p>
                <div className="buttons">
                    <Link className="buynow_link" to="/about" >
                        <button className="buynow">
                            <p>Kupi odmah</p>
                        </button>
                    </Link>
                    <button className="cart">
                        <FontAwesomeIcon icon={['fas', 'cart-plus']} />
                        <p>Dodaj u košaricu</p>
                    </button>
                </div>
*/

//<div class="photo"></div>
//<img src={props.src} alt={props.alt}/>   
//<Img fixed={props.src} />