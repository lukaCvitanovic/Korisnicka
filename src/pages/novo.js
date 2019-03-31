import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import ScrollButton from "../components/ScrollToTop";
import Menu from "../components/Menu";
import CategCards from "../components/Categ_cards";

class Novo extends Component {
    render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};

        return(
            <body>
                <div className="site_new">
                    <Header data={data} />
                    <main className="item main">
                        <Search />
                        <Menu />
                        <CategCards num="a" a={data} regex="Laptopi/" />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                    <Footer />
                </div>
            </body>
        );
    }
}
export default Novo;