import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class WarehouseDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Warehouse"); //TODO SET FINAL ROUTE FOR Warehouse
    }
}