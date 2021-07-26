import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class EntryDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("entry");
    }

    create = async (entry) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                warehouse_id: entry.warehouse_id,
                product_id: entry.product_id,
                user_id: entry.user_id ? entry.user_id : "60fd4094c953700738165073",
                quantity: entry.quantity
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

    update = async (entry) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                warehouse_id: entry.warehouse_id,
                product_id: entry.product_id,
                user_id: entry.user_id ? entry.user_id : "60fd4094c953700738165073",
                quantity: entry.quantity
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/" + entry.id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    submit = async (id) => {
        const options = {
            method: "PATCH"
        }
        const request = new Request(this.httpClient.webApiUrl + "/submit/" + id, options);
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