import React, { Component } from "react";
import fs from 'fs';

/*
const fs = require('fs')
const path = require('path')
const readline = require('readline')*/
//const debug = require('debug')('wordlist')

const wordlist_p = 'C:\\Users\\Luka\\Desktop\\Faks\\korisnicka\\\seminar\\CNS-2018-19-master\\crypto-oracle\\utils\\wordlist\\a.txt'

//var fs = require("fs");


/*
var TEXT;

function callback(obj) {
    TEXT = obj;
}

const getText = (path,callback) => {
    var fileReader = new FileReader(); 

    var file = new File(["a"],path);

    fileReader.onload = function (e) { 
    //filecontents is a div in the html that displays the file.
        callback(fileReader.result); 
    } 
    fileReader.readAsText(file);
}*/

class crypto extends Component {
    render() {
        var text = fs.readFileSync(wordlist_p);
        console.log(text);

        return(
            <body>
                <p>{text}</p>
            </body>
        );
    }
}

export default crypto;