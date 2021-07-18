import { action, observable } from "mobx";

class AuthenticationViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.authenticationModuleStore.authenticationDataStore;
        this.routerStore = rootStore.routerStore;

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    @observable email = "";
    @observable password = "";

    @action
    onEmailChange(value) {
        this.email = value;
        console.log(this.email);
    }

    @action
    onPasswordChange(value) {
        this.password = value;
    }

    @action
    onLogin() {
        //CHECK IF LOGIN SUCCESSFULL AND GO TO NEXT PAGE
    }

}

export default AuthenticationViewStore;