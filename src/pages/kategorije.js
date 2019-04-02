import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";

class Kategorije extends Component {
    render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};

        return(
            <body>
                <div className="site_kategorije">
                    <Header data={data} />
                    <main className="item main">
                        <Search />
                        <Menu />
                        
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                </div>
            </body>
        );
    }
}

export default Kategorije;