import React, { Component } from "react";

class Nama extends Component {
    render() {
        return(
            <div className="itm">
                <div className="envelop">
                    <div className="labels">
                        <p>O nama</p>
                    </div>
                    <div className="info">
                        <div className="opisi">
                            <h3>Radno vrijeme</h3>
                            <div className="detalji">
                                <p>PON-PET: 08:00-20:00</p>
                                <p>SUB: 09:00-18:00</p>
                            </div>
                        </div>
                        <div className="opisi">
                            <h3>Poslovnice</h3>
                            <div className="detalji">
                                <p>Šoping centar Joker</p>
                            </div>
                        </div>
                        <div className="opisi">
                            <h3>Dostava</h3>
                            <div className="detalji">
                                <p>Dostava se može obvljati na kućnu adresu ili na adresu poslovnice</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nama