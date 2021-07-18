import React from 'react';


export default class HttpClient extends React.Component {
    constructor(name) {
        super();
        this.webApiUrl = 'https://localhost:3000/api/' + name; //POTREBNO IZMIJENITI OVISNO O BACKEND APIJU
    }
}