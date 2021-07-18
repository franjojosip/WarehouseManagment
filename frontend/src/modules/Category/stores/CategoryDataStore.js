import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class CategoryDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("category"); //TODO SET FINAL ROUTE FOR Category
    }
}