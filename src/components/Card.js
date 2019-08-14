import React, { Component } from "react";
import {Link, navigate} from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const New = (novo) => {
    if(novo) {
        return(
            <div id="new_star_div" className="new_div">
                <FontAwesomeIcon className="new_star" icon={['fas', 'star']} />
                <span class="tooltiptext_r">Novo</span>
            </div>
        )
    }
}

const Sale = (sale) => {
    if(sale) {
        return(
            <div id="new_perc_div" className="new_div">
                <FontAwesomeIcon className="new_perc" icon={['fas', 'money-bill-wave']} />
                <span class="tooltiptext_l">Akcija</span>
            </div>
        )
    }
}

const Icons = (novo, sale) => {
    const new_icon = New(novo)
    const action = Sale(sale)

    return(
        <div className="new_icons">
            {action}
            {new_icon}
        </div>
    )
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.buy = this.buy.bind(this);
        this.cart = this.cart.bind(this);
    }

    cart = () => {
        const item = {pic: this.props.pic_data[0].node.childImageSharp.fixed,
                     name: this.props.pic_data[1].name,
                     price: this.props.pic_data[1].price};

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
        const item = {pic: this.props.pic_data[0].node.childImageSharp.fixed,
                        name: this.props.pic_data[1].name,
                        price: this.props.pic_data[1].price};
            
        const a = this.props.a;
        console.log(item);

        localStorage.setItem('kupi', JSON.stringify(item));
        navigate('/kosarica', {state: {a},});
    }

    render() {
        var name = this.props.pic_data[1].name.charAt(0).toLowerCase() + this.props.pic_data[1].name.slice(1)
        name = name.replace(/ /g,'_')
        const to = "/proizvodi/" + name
        const novo = this.props.pic_data[1].new
        const {action} = this.props.pic_data[1]
        console.log(novo)

        const icons = Icons(novo, action)
        return(
                <div class="card">
                    {icons}
                    <Link className="card_link" to={to} state={{before: this.props.a.page, user: this.props.a.user}} >
                        <div className="cilckable">
                            <Img fixed={this.props.pic_data[0].node.childImageSharp.fixed} />
                            <p className="name">{this.props.pic_data[1].name}</p>
                            <p className="price">{this.props.pic_data[1].price}Kn</p>
                            <p className="payment">Mogućnost plačanja do {this.props.pic_data[1].payment} rata</p>
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