import React from "react";
import NCards from "./Novo_cards.js";

const Exclude = (names, data) => {
    var new_data = []
    for(var j = 0; j<data.length; j++) {
        var sum = 0
        for(var i = 0; i<names.length; i++) {
            if(data[j].node.name !== names[i]) {
                sum++
            }
        }
        if(sum === names.length) {
            new_data.push(data[j])
        }
    }
    return new_data
}

const MdCards = ({jpg, json, num, a, tag, label, ne=[]}) => {
    json = Exclude(ne, json)
    jpg = Exclude(ne, jpg)

    return(
        <div class="cards_cont">
            <div class="labels">
                <p>{label}</p>
            </div>
            <NCards json={json} jpg={jpg} num={num} tag={tag} a={a} />
        </div>
    );
}

export default MdCards;