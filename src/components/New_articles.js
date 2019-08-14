import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import NCards from "./Novo_cards.js";

/*

const Pics = (list) => list.map(el => {
    return(
        <Card src={el[0].node.childImageSharp.fixed} text={el[1]}/>
    );
});

const Tags = (imgs, json, tag) => {
    const crds = [];
    for(var i = 0; i < imgs.length; i++) {
        if (imgs[i].node.name.search(tag) !== -1) {
            var temp = [imgs[i],json[i]]
            crds.push(temp);
        }
    }
    
    return crds;
}*/

class NUP extends Component {
    constructor(props) {
        super(props);
        const big = props.small * 2;
        const small = parseInt(props.small);
        this.state = {num: small, small_num: small, big_num: big, expand_btn:"Prikaži više"};
        this.click = this.click.bind(this);
    }

    click() {
        if (this.state.num === this.state.small_num)
        {
            this.setState({num: this.state.big_num});
            this.setState({expand_btn:"Sakrij"});
        }
        else
        {
            this.setState({num: this.state.small_num});
            this.setState({expand_btn:"Prikaži više"});
        }
    }

    render() {
        /*
        const pics = [];

        var js = [];
        var jp = [];

        for(var i = 0; i<this.props.json.length; i++) {
            js.push(this.props.json[i].node);
            jp.push(this.props.jpg[i].node);
        }

        var jsort = _.sortBy(js, 'name');
        var jpsort = _.sortBy(jp, 'name');

        var jpgOld = [];
        for(i = 0; i<jpsort.length; i++) {
            var temp = {"node":jpsort[i]};
            jpgOld.push(temp);
        }

        const withTag = Tags(jpgOld, jsort, "");
        
        for(i = 0;i < this.state.num; i++) {
            pics.push(withTag[i]);
        }

        const crds = Pics(pics);

*/

        var props_json = []
        for(var i = 0; i<this.props.json.length; i++) {
            for(var j = 0; j<this.props.json[i].node.articles.length; j++) {
                props_json.push(this.props.json[i].node.articles[j])
            }
        }

        return(
            <div className="nup">
                <div class="labels">
                    <p>Novo u Prodaji</p>
                    <Link className="labels_link" to="/novo" >
                        <p className="labels_p">
                            Prikaži sve
                        </p>
                    </Link>       
                </div>
                <NCards json={props_json} jpg={this.props.jpg} num={this.state.num} tag={["new"]} a={this.props.a}/>
                <div className="prosiri" onClick={this.click}>
                    <p>{this.state.expand_btn}</p>
                </div>
            </div>
        );
    }
}

export default (props) => (
    <StaticQuery
    query={graphql`
        query nup {
            jpg: allFile(filter: {extension:{eq:"jpg"}})
            {
                edges
                {
                    node
                    {
                            relativePath
                            childImageSharp {
                                fixed(width: 125, height: 125) {
                                    ...GatsbyImageSharpFixed
                                }
                                f2: fluid(maxWidth: 400, maxHeight: 400) {
                                    ...GatsbyImageSharpFluid
                                }
                        }
                        name
                    }
                }
            }
            json: allArticlesJson(filter: {name: {ne: "db"}}) {
                edges {
                  node {
                    name
                    articles {
                      node {
                        avelable
                        description
                        details
                        name
                        payment
                        price
                        warranty
                        new
                        action
                      }
                    }
                  }
                }
              }
        }
    `}
    render={data => <NUP jpg={data.jpg.edges} json={data.json.edges} small={props.small} a={props.a} />}
    />
)

/*
<div className="nup">
                <div class="labels">
                    <p>Novo u Prodaji</p>
                    <Link className="labels_link" to="/about" >
                        <p className="labels_p">
                            Prikaži sve
                        </p>
                    </Link>       
                </div>
                <div class="cards">
                    {crds}
                </div>
                <div className="prosiri" onClick={this.click}>
                    <p>{this.state.expand_btn}</p>
                </div>
            </div>
*/