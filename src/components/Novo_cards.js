import React, { Component } from "react";
import Card from "./Card.js";
import _ from "underscore";

const Pics = (list, a) => list.map(el => {
    return(
        <Card pic_data={el} src={el[0].node.childImageSharp.fixed} text={el[1]} a={a}/>
    );
});

const Tags = (imgs, json, tag) => {
    const crds = [];
    //console.log(imgs);
    //console.log(json);
    for(var i = 0; i < imgs.length; i++) {
        var temp
        if(tag.length > 0) {
            var sum = 0
            for(var j = 0; j<tag.length; j++) {
                if(json[i][tag[j]]) {
                    sum++
                }
                if(sum === tag.length) {
                    temp = [imgs[i],json[i]]
                    crds.push(temp);
                }
            }
        }
        else {
            temp = [imgs[i],json[i]]
            crds.push(temp);
        }
    }
    return crds;
}

class NCards extends Component {
    render () {
        console.log(this.props)

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

        const withTag = Tags(jpgOld, jsort, this.props.tag);
        
        var end;

        if (typeof this.props.num === 'number') {
            end = this.props.num;
        }
        else {
            end = withTag.length;
        }

        for(i = 0;i < end; i++) {
            pics.push(withTag[i]);
        }
        console.log(withTag)
        const crds = Pics(pics, this.props.a);
        
        return(
            <div className="cards">
                {crds}
            </div>
        );
    }
}

export default NCards;

/*console.log(this.props)
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


        const withTag = Tags(jpgOld, jsort, this.props.tag);
        
        var end;

        if (typeof this.props.num === 'number') {
            end = this.props.num;
        }
        else {
            end = withTag.length;
        }

        for(i = 0;i < end; i++) {
            pics.push(withTag[i]);
        }
        
        const crds = Pics(pics, this.props.a);

        return(
            <div className="cards">
                {crds}
            </div>
        ); */