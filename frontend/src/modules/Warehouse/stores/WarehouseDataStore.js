import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class WarehouseDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("warehouse");
    }

    create = async (warehouse) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                name: warehouse.name,
                location_id: warehouse.location_id,
                users: warehouse.users.length > 0 ? warehouse.users.map(user => user.id) : [],
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

    update = async (warehouse) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                name: warehouse.name,
                location_id: warehouse.location_id,
                users: warehouse.users.length > 0 ? warehouse.users.map(user => user.id) : [],
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/" + warehouse.id, options);
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