import React, { Component } from 'react';
import { Link } from "gatsby"
import { navigate } from "@reach/router";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const list = [
    { name: 'početna', to:"/" },
    { name: 'novo', to:"/novo" },
    { name: 'akcije', to:"/akcije" },
    { name: 'košarica', to:"/kosarica" },
    { name: 'profil', to:"/profil" },
    { name: 'registriraj se', to:"/registriraj_se" }
  ];
   
  const MenuItem = ({ text, to, data }) => {
    return (
        <div className="menu-item">
            <Link className = "Layout_nav_link" to={to} state={{before: data.page, user: data.user}} activeClassName="active" >
                {text}
            </Link>  
        </div>
    );
  };
   
  export const Menu = (list, data) => list.map(el => {
    return (
      <MenuItem text={el.name} to={el.to} data={data} />
    );
  });
   
  const Arrow = ({ text, className }) => {
    return (
        <div  className={className}>
            {text}
        </div>
    );
  };
   
   
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
   
  class HeaderScroll extends Component {
    logOf = (data) => {
      const nav = document.getElementsByClassName('nav')[0]
      if(nav === undefined) {
        document.getElementsByClassName('HeaderScroll1')[0].className = "HeaderScroll"
        document.getElementsByClassName('nav1')[0].className = "nav"
      }
      navigate(data.page, {state: {before: data.page, user: "guest"}})
    }

    createULink = (data) => {
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
              <div className="menu-item">
                <Link className = "Layout_nav_link" to="/prijavi_se" state={{before: data.page, user: data.user}} activeClassName="active" >
                    Prijavi se
                </Link>
              </div>
          )
      }
    }

    state = {
      selected: 0
    };
    
    onSelect = key => {
      this.setState({ selected: key });
    }

    check() {
      const odjava = document.getElementsByClassName('odjava')[0]
      const nav = document.getElementsByClassName('nav')[0]
      if(odjava === undefined && nav === undefined) {
        document.getElementsByClassName('HeaderScroll1')[0].className = "HeaderScroll"
        document.getElementsByClassName('nav1')[0].className = "nav"
      }
      else if(odjava !== undefined && nav !== undefined) {
        document.getElementsByClassName('HeaderScroll')[0].className = "HeaderScroll1"
        document.getElementsByClassName('nav')[0].className = "nav1"
      }
    }

    componentDidMount() {
      this.check()
    }
    
    render() {
      const { selected } = this.state;
      // Create menu from items
      var menu = Menu(list, this.props.data);
      const login = this.createULink(this.props.data)
      menu.push(login)
   
      return (
        <div className="HeaderScroll">
          <ScrollMenu
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selected}
            onSelect={this.onSelect}
          />
        </div>
      );
    }
  }

  export default HeaderScroll;