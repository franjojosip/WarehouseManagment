import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class EntryDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Entry"); //TODO SET FINAL ROUTE FOR Entry
    }
}