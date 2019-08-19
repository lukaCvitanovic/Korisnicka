import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Nama from "../components/Nama"

class Onama extends Component {
    componentDidMount() {
        document.title = "O nama"
    }

    render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};
            
        return(
            <body>
                <div className="site_o_nama">
                    <Header data={data} />
                    <main className="item main">
                        <Search d={data} />
                        <Menu d={data} />
                        <Nama />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                    <Footer data={data} />
                </div>
            </body>
        )
    }
}

export default Onama