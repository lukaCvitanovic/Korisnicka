import React, { Component } from "react";
import { Link } from "gatsby";
import HeaderScroll from './HeaderScrol.js';

const nav_links_r = [{to:"/", text:"Početna"},
                     {to:"/novo", text:"Novo"},
                     {to:"/akcije", text:"Akcije"}];

const nav_links_l = [{to:"/kosarica", text:"Košarica"},
                     {to:"/profil", text:"Profil"},
                     {to:"/registriraj_se", text:"Registriraj se"},
                     {to:"/prijavi_se", text:"Prijavi se"}];

const createNavLinks = (list, data) => list.map(el => {
    return(
        <Link className = "Layout_nav_link" to={el.to} state={{before: data.page, user: data.user}} activeClassName="active" >
            {el.text}
        </Link>
    );
});

class Header extends Component {
    render() {
        const nav_r = createNavLinks(nav_links_r, this.props.data);
        const nav_l = createNavLinks(nav_links_l, this.props.data);

        return (
            <header class="item header">
                <HeaderScroll data={this.props.data} />
                <nav className="nav">
                    <div className = "Layout_nav_link_r">
                        {nav_r}
                    </div>
                    <div className = "Layout_nav_link_l">
                        {nav_l}
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