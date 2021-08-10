import "../NotFound.css";
import React from 'react';

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="notFoundCard">
                <h1 id="notFoundTitle">Stranica nije pronađena</h1>
            </div>
        );
    }
}