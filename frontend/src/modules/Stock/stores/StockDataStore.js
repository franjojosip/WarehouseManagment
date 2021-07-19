import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class StockDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Stock"); //TODO SET FINAL ROUTE FOR Stock
    }
}