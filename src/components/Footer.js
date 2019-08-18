import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby";

const Footer = (data) => {
    const a = data.data
    console.log(a.user)
    console.log(a)
    return (
        <footer class="item footer">
            <div class="links" id="li1">
                <p className="sluzba">Služba za korisnike</p>
                <Link className="o_nama" to="/o_nama" state={{before: a.page, user: a.user}} >
                    <p>O nama</p>
                </Link>
            </div>
            <div class="links" id="li3">
                <div class="icons">
                    <Link className="social_link" to="https://hr-hr.facebook.com/">
                        <FontAwesomeIcon name="facebook" size="2x" icon={['fab', 'facebook']} />
                    </Link>
                    <Link className="social_link" to="https://twitter.com/?lang=hr">
                        <FontAwesomeIcon name="twitter" size="2x" icon={['fab', 'twitter']} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;