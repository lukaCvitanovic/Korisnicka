import React, { Component } from "react";
import Cat from "./Category.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticQuery, graphql, Link } from "gatsby";
//import { prefix } from "@fortawesome/free-brands-svg-icons";
/*
const list = [
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' },
    { icn: 'facebook' }
];*/

const IconItem = (list, data) => list.map(el => {
    const { node } = el;
    console.log(data)
    var name = node.name.replace('_',' ');
    if(data.page === node.to) {
        return (
            <Link className="icon" to={node.to} activeStyle={{backgroundColor:"green"}}>
                <FontAwesomeIcon style={{color:"white"}} icon={[node.prefix, node.icon]} size="4x" />
                <p style={{color:"white"}}>{name}</p>
            </Link>
        );
    }
    else {
        return (
            <Link className="icon" to={node.to}>
                <FontAwesomeIcon icon={[node.prefix, node.icon]} size="4x" />
                <p>{name}</p>
            </Link>
        );
    }
});

export const Icon = ({data}) => {
    return(
        <div className="menu">
            <p class="cat_label">
                Kategorije
            </p>
            <div class="aside__content">
                {data}
            </div>
        </div>
    );
}

const Cats = (tree, data) => (tree.names).map(el => {
    //console.log(el)
    var subnames = [];
    for(var i = 0; i<tree[el].names.length; i++) {
        subnames.push(tree[el].names[i].replace('_',' '));
    }
    
    var to = el.charAt(0).toLowerCase() + el.slice(1)
    to = to.replace(' ','_')

    return (
        <Cat name={el} sub={subnames} data={data} to={to} />
    );
});

const Tree = (edges) => {
    console.log(edges)
    var tree = {names: []};
    for(var i = 0; i<edges.length; i++) {
        var name = edges[i].node.name;
        if((edges[i].node.relativeDirectory === "") && (!tree[name])) {
            tree[name] = {"names":[]};
            tree.names.push(name);
        }
        else {
            var relname = edges[i].node.relativeDirectory;
            if((tree[relname]) && (tree[relname] === {"names":[]})) {
                tree[relname][name] = {};
                tree[relname].names = [name];
            }
            else {
                tree[relname][name] = {};
                tree[relname].names.push(name);
            }
        }
    }
    return tree;
}

class SetIcons extends Component {
    render() {
        const icns = IconItem(this.props.icons, this.props.data);

        return(
            <Icon data={icns} />
        );
    }
}

class Menu extends Component {

    render() {
        const tree = Tree(this.props.dirs);
        const Categs = Cats(tree, this.props.d);
        //console.log(Categs)
        
        return(
            <aside class="item kategorije">
                <SetIcons icons={this.props.icons} data={this.props.d} />
                <div class="kategorije_menu">
                    <hr className="line"/>
                    {Categs}
                </div>
            </aside>
        );
    }    
}

//export default Menu;

export default (props) => (
    <StaticQuery
    query={graphql`
        query category {
            allDirectory(filter: {relativeDirectory: {ne: "..", nin: "Markdown-pages"}, name: {ne: "Markdown-pages"}})
            {
                edges
                {
                    node
                    {
                        name
                        relativeDirectory
                    }
                }
            }
            allArticlesJson (filter: {name:{ne:"db"}}) {
                edges {
                    node {
                        prefix
                        icon
                        name
                        to
                    }
                }
            }
        }
    `}
    render={data => <Menu dirs={data.allDirectory.edges} icons={data.allArticlesJson.edges} {...props} />}
    />
)