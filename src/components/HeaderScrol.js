import React, { Component } from 'react';
import { Link } from "gatsby"
import ScrollMenu from 'react-horizontal-scrolling-menu';

// list of items
const list = [
    { name: 'početna', to:"/" },
    { name: 'novo', to:"/novo" },
    { name: 'akcije', to:"/akcije" },
    { name: 'košarica', to:"/kosarica" },
    { name: 'profil', to:"/profil" },
    { name: 'registriraj se', to:"/registriraj_se" },
    { name: 'prijavi se', to:"/prijavi_se" }
  ];
   
  // One item component
  // selected prop will be passed
  const MenuItem = ({ text, to, data }) => {
    return (
        <div  className="menu-item">
            <Link className = "Layout_nav_link" to={to} state={{before: data.page, user: data.user}} activeClassName="active" >
                {text}
            </Link>  
        </div>
    );
  };
   
  // All items component
  // Important! add unique key
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
    state = {
      selected: 0
    };
    
    onSelect = key => {
      this.setState({ selected: key });
    }
   
    
    render() {
      const { selected } = this.state;
      // Create menu from items
      //console.log(list[0]);
      const menu = Menu(list, this.props.data);
   
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