import React, { Component } from "react";
import "../styles/layout.css";
import Header from "../components/Header.js";
import Menu from "../components/Menu.js";
import Search from "../components/Search";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import NUP from "../components/New_articles";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ScrollButton from "../components/ScrollToTop";

library.add( fab, fas );

const userStatus = (location) => {
    if(location.state === null) {
        location.state = {user: "guest"};
    }
}

class Index extends Component {
    componentDidMount() {
        document.title = "Početna"
    }

    render() {
        userStatus(this.props.location);
        const data = {page: this.props.location.pathname
            , user: this.props.location.state.user};
        console.log(data)

        return (
            <body>
                <div class="site">
                    <Header data={data} />
                    <main class="item main">
                        <Search d={data}/>
                        <Menu d={data} />
                        <Cards num="4" a={data} />
                        <NUP small="4" a={data} />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
                    </main>
                    <Footer data={data} />
                </div>
            </body>
        );
    }
}

export default Index;