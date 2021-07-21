import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class StocktakingDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Stocktaking"); //TODO SET FINAL ROUTE FOR Stocktaking
    }
}