import React, { Component } from "react";
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from "underscore";

const Links = (subnames, before, user) => subnames.map(el => {
    var to = el.charAt(0).toLowerCase() + el.slice(1)
    to = "/kategorije/" + to.replace(' ','_')

    var bcolor, color
    if(before.search(to) >= 0) {
        bcolor = {backgroundColor: "#005e00"}
        color = {color: "white", display: "inherit"}
    }
    else {
        bcolor = {}
        color = {display: "inherit"}
    }

    if(subnames.length > 1) {
        if(el === subnames[0]) {
            return(
                <Link className="cat_link2" to={to} activeStyle={bcolor} state={{before:before, user:user}}>
                    <p style={color}>{el}</p>
                </Link>
            );
        }
        else if(el === subnames[subnames.length-1]) {
            return(
                <div className="subname2" style={bcolor}>
                    <hr className="subname_line" />
                    <Link className="cat_link3" to={to} state={{before:before, user:user}}>
                        <p style={color}>{el}</p>
                    </Link>
                </div>
            );
        }
        else {
            return(
                <div className="subname" style={bcolor}>
                    <hr className="subname_line" />
                    <Link className="cat_link3" to={to} state={{before:before, user:user}}>
                        <p style={color}>{el}</p>
                    </Link>
                </div>
            );
        }
    }
    else {
        return(
            <Link className="cat_link3" to={to} activeStyle={bcolor} state={{before:before, user:user}}>
                <p style={color}>{el}</p>
            </Link>
        );
    }
});


class Cat extends Component {
    constructor(props) {
        super(props);
        this.state = {display:'none', state:0, icon:'caret-right', button_class:'dropdown_btn'};
        this.click = this.click.bind(this);
        const links = Links(props.sub, props.data.page, props.data.user);
        if (this.num === 0) {
            this.state = this.checkLinks(links)
        }
    }
    
    num = 0

    checkLinks(links) {
        if(links.length > 0) {
            for(var i = 0; i < links.length; i++) {
                switch(links[i].props.className) {
                    case 'cat_link2':
                        if(!_.isEmpty(links[i].props.activeStyle)) {
                            this.num++
                            return {display:'grid', state:1, icon:'caret-down', button_class:'dropdown_btn_active'}
                        }
                        break
                    case 'subname':
                        if(!_.isEmpty(links[i].props.style)) {
                            this.num++
                            return {display:'grid', state:1, icon:'caret-down', button_class:'dropdown_btn_active'}
                        }
                        break
                    case 'subname2':
                        if(!_.isEmpty(links[i].props.style)) {
                            this.num++
                            return {display:'grid', state:1, icon:'caret-down', button_class:'dropdown_btn_active'}
                        }
                        break
                    default:
                        break
                }
            }
        }
        return {display:'none', state:0, icon:'caret-right', button_class:'dropdown_btn'}
    }

    click() {
        if (this.state.state === 0)
        {
            this.setState({display:'grid', state:1, icon:'caret-down', button_class:'dropdown_btn_active'});
        }
        else
        {
            this.setState({display:'none', state:0, icon:'caret-right', button_class:'dropdown_btn'});
        }
    }

    render() {
        const FAicon = <FontAwesomeIcon icon={['fas', this.state.icon]} />;
        const links = Links(this.props.sub, this.props.data.page, this.props.data.user);
        const to = "/kategorije/" + this.props.to
        var name = this.props.name.charAt(0).toLowerCase() + this.props.name.slice(1).replace(' ','_')

        var style        
        if(this.props.data.page.search(name) >= 0) {
            style = {backgroundColor: "#005e00", color: "white"}
        }
        else {
            style = {}
        }

        
        if(this.props.sub.length === 0) {
            return(
                <div class="dropdown">
                    <Link className="cat_link" to={to} state={{before: this.props.data.page, user: this.props.data.user}} >
                        <button class="dropdown_btn_link" style={style} >
                            <p className="dropdown_btn_p" style={style}>{this.props.name}</p>
                        </button>
                    </Link>
                    <div class="dropdown_content" style={{display: this.state.display}} >
                    </div>
                    <hr className="line"/>
                </div>
            );
        }
        else {
            return(
                <div class="dropdown_links">
                    <div className="dd_div">
                        <button class={this.state.button_class} onClick={this.click} >
                            <p className="dropdown_btn_p">{this.props.name}</p>
                            {FAicon}
                        </button>
                    </div>
                    <div class="dropdown_content" style={{display: this.state.display}} >
                        {links}
                    </div>
                    <hr className="line"/>
                </div>
            );
        }
    }
}

export default Cat;