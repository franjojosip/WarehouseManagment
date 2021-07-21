import React from "react";
import HttpClient from "../../../common/HttpClient";

export default class NotificationDataStore extends React.Component {
    constructor() {
        super();
        this.httpClient = new HttpClient("Notification"); //TODO SET FINAL ROUTE FOR Notification
    }
}