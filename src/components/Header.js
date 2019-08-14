import React, { Component } from "react";
import { Link } from "gatsby";
import HeaderScroll from './HeaderScrol.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigate } from "@reach/router";

const nav_links_r = [{to:"/", text:"Početna"},
                     {to:"/novo", text:"Novo"},
                     {to:"/akcije", text:"Akcije"}];

const nav_links_l = [{to:"/kosarica", text:"Košarica"},
                     {to:"/profil", text:"Profil"},
                     {to:"/registriraj_se", text:"Registriraj se"}];

class Header extends Component {
    createNavLinks = (list, data) => list.map(el => {
        return(
            <Link className = "Layout_nav_link" to={el.to} state={{before: data.page, user: data.user}} activeClassName="active" >
                {el.text}
            </Link>
        );
    });
    
    createUserLink = (data) => {
        console.log(data)
        if((data.user !== undefined) && (data.user !== "guest")) {
            return(
                <div className="user_link">
                    <FontAwesomeIcon className="user_icon" icon={['fas', 'user-circle']} size="2x" />
                    <p>{data.user}</p>
                    <div className = "odjava" onClick={() => { this.logOf(data); }} >
                        Odjavi se
                    </div>
                </div>
            )
        }
        else {
            return(
                <Link className = "Layout_nav_link" to="/prijavi_se" state={{before: data.page, user: data.user}} activeClassName="active" >
                    Prijavi se
                </Link>
            )
        }
    }

    logOf = (data) => {
        navigate(data.page, {state: {before: data.page, user: "guest"}})
    }

    render() {
        const nav_r = this.createNavLinks(nav_links_r, this.props.data);
        const nav_l = this.createNavLinks(nav_links_l, this.props.data);
        const user = this.createUserLink(this.props.data)

        return (
            <header class="item header">
                <HeaderScroll data={this.props.data} />
                <nav className="nav">
                    <div className = "Layout_nav_link_r">
                        {nav_r}
                    </div>
                    <div className = "Layout_nav_link_l">
                        {nav_l}
                        {user}
                    </div>          
                </nav>
            </header>
        );
    }
}

export default Header;

/*
<Link className = "Layout_nav_link" to = "/" activeClassName="active">
                        Početna
                    </Link>    
                    <Link className = "Layout_nav_link" to = "/blog">
                        Blog
                    </Link>
                    <Link className = "Layout_nav_link" to = "/akcije">
                        Akcije
                    </Link>
*/

/*
<Link className = "Layout_nav_link" to = "/">
                        Košarica
                    </Link>    
                    <Link className = "Layout_nav_link" to = "/blog">
                        Profil
                    </Link>
                    <Link className = "Layout_nav_link" to = "/akcije">
                        Registriraj se
                    </Link>
                    <Link className = "Layout_nav_link" to = "/akcije">
                        Prijavi se
                    </Link>
*/