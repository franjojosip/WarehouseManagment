import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class RoleDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("role");
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
}