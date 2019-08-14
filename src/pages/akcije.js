import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";
import Footer from "../components/Footer";
import NovoCards from "../components/Categ_cards";

class Akcije extends Component {
    componentDidMount() {
        document.title = "Akcije"
    }

    render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};
        
        return(
            <body>
                <div className="site_new">
                    <Header data={data} />
                    <main className="item main">
                        <Search d={data} />
                        <Menu d={data} />
                        <NovoCards num="a" a={data} tag={["action"]} label="Akcije" />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                    <Footer />
                </div>
            </body>
        )
    }
}

export default Akcije;