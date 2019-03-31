import React, { Component } from "react";
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Links = (subnames) => subnames.map(el => {
    return(
        <Link className="cat_link" to="/about" >
            {el}
        </Link>
    );
});

class Cat extends Component {
    constructor(props) {
        super(props);
        this.state = {display:'none', state:0, icon:'caret-right'};
        this.click = this.click.bind(this);
    }

    click() {
        if (this.state.state === 0)
        {
            this.setState({display:'grid', state:1, icon:'caret-down'});
        }
        else
        {
            this.setState({display:'none', state:0, icon:'caret-right'});
        }
    }

    render() {
        const FAicon = <FontAwesomeIcon icon={['fas', this.state.icon]} />;
        const links = Links(this.props.sub);

        if(this.props.sub.length === 0) {
            return(
                <div class="dropdown">
                    <Link className="cat_link" to="/about">
                        <button class="dropdown_btn_link" >
                            <p className="dropdown_btn_p">{this.props.name}</p>
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
                <div class="dropdown">
                    <button class="dropdown_btn" onClick={this.click} >
                        <p className="dropdown_btn_p">{this.props.name}</p>
                        {FAicon}
                    </button>
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

/*
.dropdown:hover > .dropdown_content {
    display: grid;
}
*/