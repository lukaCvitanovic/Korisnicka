import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby";

function Footer() {
    return (
        <footer class="item footer">
            <div class="links" id="li1">
                <p className="sluzba">Služba za korisnike</p>
                <Link className="o_nama" to="/about" >
                    <p>O nama</p>
                </Link>
            </div>
            <div class="links" id="li3">
                <div class="icons">
                    <Link className="social_link" to="/about">
                        <FontAwesomeIcon name="facebook" size="2x" icon={['fab', 'facebook']} />
                    </Link>
                    <Link className="social_link" to="/about">
                        <FontAwesomeIcon name="twitter" size="2x" icon={['fab', 'twitter']} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

/*
    .footer {
    height: auto;
    display: grid;
    grid-gap: var(--padding);
    grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
    grid-auto-rows: 135px;
    overflow: initial;
}
.footer {
    background-color: #9b9b9b;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
    ". li1 li2 li3";
    padding: 0;
}
.links {
    display: flex;
    width: 100%;
    padding: var(--padding, 0px);
    color: var(--secondary-color, black);
    flex-direction: column;
    text-align: left;
}
#li1 {
    grid-area: li1;
}
#li2 {
    grid-area: li2;
}
#li3 {
    grid-area: li3;
}
.icons {
    display: table;
    margin: auto;
}
*/