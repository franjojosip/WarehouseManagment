import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class LocationDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Location"); //TODO SET FINAL ROUTE FOR Location
    }
}