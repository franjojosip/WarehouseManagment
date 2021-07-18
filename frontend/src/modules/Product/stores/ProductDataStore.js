import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class ProductDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Product"); //TODO SET FINAL ROUTE FOR Product
    }
}