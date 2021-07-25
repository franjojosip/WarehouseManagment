import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class ProductDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("product");
    }

    create = async (product) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                name: product.name,
                category_id: product.category_id,
                subcategory_id: product.subcategory_id != "" ? product.subcategory_id : null,
                packaging_id: product.packaging_id != "" ? product.packaging_id : null,
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

    update = async (product) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                name: product.name,
                category_id: product.category_id,
                subcategory_id: product.subcategory_id != "" ? product.subcategory_id : null,
                packaging_id: product.packaging_id != "" ? product.packaging_id : null,
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/" + product.id, options);
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