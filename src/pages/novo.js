import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import ScrollButton from "../components/ScrollToTop";
import Menu from "../components/Menu";
import NovoCards from "../components/Categ_cards";
import "../styles/novo_lay.css";

class Novo extends Component {
    componentDidMount() {
        document.title = "Novo"
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
                        <NovoCards num="a" a={data} tag={["new"]} label="Novo" />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                    <Footer />
                </div>
            </body>
        );
    }
}

export default Novo;

// Za potrebe kategorija i stranica novo i akcija
// treba staviti sve JSON filove u jedan folder (JSON)
// te u JSON-ima napraviti vrijednost path koja se odnosi na 
// relativnu lokaciju slike za koju je vezana taj JSON

// Na ovaj nacin je moguce sa istim query-em dobiti sve JSON filove