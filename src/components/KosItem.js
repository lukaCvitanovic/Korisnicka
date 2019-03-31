import React, { Component } from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class KosItem extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.sendToParet = this.sendToParet.bind(this);
    }

    sendToParet = () => {
        this.props.parentCallback("a");
    }

    remove = () => {
        const name = this.props.data.name;
        const time = this.props.time;

        if(this.props.storage === 'kosarica') {
            var kosarica = JSON.parse(localStorage.getItem('kosarica'));
            var newk = [];

            for(var i = 0; i<kosarica.length;i++) {
                if(kosarica[i].name !== name) {
                    newk.push(kosarica[i]);
                }
            }

            localStorage.setItem('kosarica', JSON.stringify(newk)); 
        }
        else {
            localStorage.setItem('kupi', JSON.stringify({price: "0,00", amount: 0})); 
        }        

        const div = document.getElementById(time);
        if(div) {
            div.remove();
        }

        this.sendToParet();
    }

    render() {
        console.log(this.props.time);

        return(
            <div id={this.props.time} className="kositem">
                <div className="upper">
                    <Img fixed={this.props.data.pic} />
                    <div className="kos_label">
                        <p className="kositem_name">{this.props.data.name}</p>
                        <p className="kositem_prize">{this.props.data.price} Kn</p>
                    </div>
                </div>
                <button className="del_item" onClick={ () => {this.remove();}}>
                    <FontAwesomeIcon icon={['fas', 'trash']} size="2x" />
                </button>
            </div>
        );
    }
}

export default KosItem;

/*
    {pic: this.props.src,
                     name: this.props.text.name,
                     price: this.props.text.price};
*/