import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class AuthenticationDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("authentication"); //TODO SET FINAL ROUTE FOR LOGIN
    }
}