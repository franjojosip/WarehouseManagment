import React from 'react';
import { getUser } from './LocalStorage';

export default class HttpClient extends React.Component {
    constructor(name) {
        super();
        this.createAppJsonHeaders = this.createAppJsonHeaders.bind(this);
        this.webApiUrl = 'http://localhost:3001/' + name;
        this.createAppJsonHeaders();
    }

    createAppJsonHeaders() {
        this.appJsonHeaders = new Headers();
        this.appJsonHeaders.append("Content-Type", "application/json");
    }

    createBodyWithTokens(object, isAdminRoute) {
        let loggedUser = getUser();
        object.accessToken = loggedUser.accessToken;
        object.refreshToken = loggedUser.refreshToken;
        if(isAdminRoute){
            object.userId = loggedUser.id;
        }
        return JSON.stringify(object);
    }

    create = async (body) => {
        const options = {
            method: "POST",
            headers: this.appJsonHeaders,
            body
        }
        const request = new Request(this.webApiUrl + "/add", options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    get = async (body) => {
        const options = {
            method: "POST",
            headers: this.appJsonHeaders,
            body
        }
        const request = new Request(this.webApiUrl + "/", options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    update = async (id, body) => {
        const options = {
            method: "PATCH",
            headers: this.appJsonHeaders,
            body
        }
        const request = new Request(this.webApiUrl + "/" + id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    delete = async (id, body) => {
        const options = {
            method: "REMOVE",
            headers: this.appJsonHeaders,
            body
        }
        const request = new Request(this.webApiUrl + "/remove/" + id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }

    submit = async (id, body) => {
        const options = {
            method: "PATCH",
            headers: this.appJsonHeaders,
            body
        }
        const request = new Request(this.webApiUrl + "/submit/" + id, options);
        let response = await (fetch(request));
        let data = await response.json();
        return data;
    }
}