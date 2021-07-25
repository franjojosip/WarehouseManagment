import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class AuthenticationDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("users");
    }

    create = async (user) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                password: user.password,
                role_id: user.role_id,
                phone: user.phone
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/register", options);
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

    update = async (user) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                role_id: user.role_id,
                phone: user.phone
            })
        }
        const request = new Request(this.httpClient.webApiUrl + "/" + user.id, options);
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