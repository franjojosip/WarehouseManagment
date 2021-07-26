import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class StockDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("stock");
    }

    create = async (stock) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                warehouse_id: stock.warehouse_id,
                product_id: stock.product_id,
                quantity: stock.quantity,
                minimum_quantity: stock.min_quantity,
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/add", options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    get = async () => {
        const options = {
            method: "GET"
        }
        const request = new Request(this.httpClient.webApiUrl + "/", options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    update = async (stock) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                warehouse_id: stock.warehouse_id,
                product_id: stock.product_id,
                quantity: stock.quantity,
                minimum_quantity: stock.min_quantity,
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/" + stock.id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    delete = async (id) => {
        const options = {
            method: "DELETE"
        }
        const request = new Request(this.httpClient.webApiUrl + "/remove/" + id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }
}