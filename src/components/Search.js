import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Search() {
    return(
        <div class="item search">
            <div className="search_box">
                <input placeholder="Pretraži"/>
                <FontAwesomeIcon icon="search" />
            </div>
        </div>
    );
}

export default Search;