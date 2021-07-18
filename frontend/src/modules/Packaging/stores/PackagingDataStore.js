import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class PackagingDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("packaging"); //TODO SET FINAL ROUTE FOR CITIES
    }
}