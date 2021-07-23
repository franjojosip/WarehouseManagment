import React from 'react';

export default class HttpClient extends React.Component {
    constructor(name) {
        super();
        this.webApiUrl = 'http://localhost:3001/' + name; //POTREBNO IZMIJENITI OVISNO O BACKEND APIJU
    }
}