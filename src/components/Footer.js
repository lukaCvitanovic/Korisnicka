import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby";

function Footer() {
    return (
        <footer class="item footer">
            <div class="links" id="li1">
                <p className="sluzba">Služba za korisnike</p>
                <Link className="o_nama" to="/o_nama" >
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