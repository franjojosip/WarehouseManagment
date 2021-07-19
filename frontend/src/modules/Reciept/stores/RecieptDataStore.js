import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class RecieptDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Reciept"); //TODO SET FINAL ROUTE FOR Reciept
    }
}