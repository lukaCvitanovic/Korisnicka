import React, { Component } from "react";
import {navigate} from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "gatsby-image";
import MdCards from "./Mkdwn_cards";

const Detail = (details) => details.map(el => {
    return(
        <p className="detail">{el}</p>
    )
})

const Naming = (name, details) => {
    var final = name
    for(var i = 0; i<details.length; i++) {
        final = final.concat(", ", details[i])
    }
    return final
}

class Item extends Component {
    constructor(props) {
        super(props)
        this.buy = this.buy.bind(this);
        this.cart = this.cart.bind(this);
    }

    cart() {
        const item = {pic: this.props.item_data[0].node.childImageSharp.fixed,
            name: this.props.item_data[1].name,
            price: this.props.item_data[1].price}

        var kosarica = JSON.parse(localStorage.getItem('kosarica'));
        if(kosarica) {
            kosarica.push(item);
            localStorage.setItem('kosarica', JSON.stringify(kosarica));
        }
        else {
            localStorage.setItem('kosarica', JSON.stringify([item]));
        }
    }

    buy() {
        const item = {pic: this.props.item_data[0].node.childImageSharp.fixed,
                        name: this.props.item_data[1].name,
                        price: this.props.item_data[1].price}
        
        const a = this.props.d
        localStorage.setItem('kupi', JSON.stringify(item))
        navigate('/kosarica', {state: a})
    }

    render() {
        const jpg = this.props.query.jpg.edges
        const json = this.props.query.json.edges[0].node.articles

        const {name} = this.props.item_data[1]
        const {f2} = this.props.item_data[0].node.childImageSharp
        f2['aspectRatio'] = 1
        const {price} = this.props.item_data[1]
        const {payment} = this.props.item_data[1]
        const mounthly = (parseFloat(price)/parseFloat(payment)).toFixed(2)
        const {warranty} = this.props.item_data[1]
        const {details} = this.props.item_data[1]

        let avelable
        if(this.props.item_data[1].avelable) {
            avelable = "Da"
        }
        else {
            avelable = "Ne"
        }

        const detalji = Detail(details)
        const final_name = Naming(name, details)
        console.log(this.props)

        return(
            <div className="itm">
                <p className="item_name">{name}</p>
                <div className="content">
                    <Img className="pic" fluid={f2} />
                    <div className="items_cijena">
                        <div className="sub_cijena">
                            <div id="cijena">
                                <p id="sub_cijena_text">Cijena: </p>
                                <p id="sub_cijena_price">{price} Kn</p>
                            </div>
                            <p id="placanje">Mogućnost plačanja do {payment} rata. Već od {mounthly} Kn mjesečno.</p>
                            <button className="buynow" onClick={ () => {this.buy();} }>
                                <p>Kupi odmah</p>
                            </button>
                            <button className="cart" onClick={ () => { this.cart(); }}>
                                <FontAwesomeIcon icon={['fas', 'cart-plus']} />
                                <p>Dodaj u košaricu</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="opis">
                    <p>{final_name}</p>
                    <hr/>
                    <div className="dostupnost">
                        <p>Dostupnost: {avelable}</p>
                        <p>Garancija: {warranty} mjeseci</p>
                    </div>
                    <hr/>
                    <div className="detalji_itms">
                        {detalji}
                    </div>
                </div>
                <div className="preporuke">
                    <p id="preporuke_text">Preporuke</p>
                    <MdCards jpg={jpg} json={json} num={3} tag={[]} a={this.props.d} ne={[name]} />
                </div>
            </div>
        )
    }
}

export default Item