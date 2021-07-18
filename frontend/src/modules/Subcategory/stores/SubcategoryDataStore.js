import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class SubcategoryDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Subcategory"); //TODO SET FINAL ROUTE FOR Subcategory
    }
}