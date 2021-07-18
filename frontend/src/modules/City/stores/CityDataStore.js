import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class CityDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("city"); //TODO SET FINAL ROUTE FOR CITIES
    }
}