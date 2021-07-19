import { action, observable } from "mobx";
import EmailValidator from "email-validator";

class AuthenticationViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.authenticationModuleStore.authenticationDataStore;
        this.routerStore = rootStore.routerStore;

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onResetPasswordEmailChange = this.onResetPasswordEmailChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onForgotPasswordClick = this.onForgotPasswordClick.bind(this);
        this.onForgotPasswordSubmit = this.onForgotPasswordSubmit.bind(this);
    }

    @observable email = "";
    @observable password = "";
    @observable isSubmitDisabled = true;

    @action
    onEmailChange(value) {
        this.email = value;
        this.checkFields();
    }

    @action
    onPasswordChange(value) {
        this.password = value;
        this.checkFields();
    }

    @action
    checkFields() {
        let isEmailValid = EmailValidator.validate(this.email);
        if(isEmailValid && this.password.length > 4){
            this.isSubmitDisabled = false
        }
        else{
            this.isSubmitDisabled = true;
        }
    }

    @action
    onLogin(){
        //CHECK IF LOGIN SUCCESSFULL AND GO TO NEXT PAGE
    }

    @action
    onResetPasswordEmailChange(value) {
        this.email = value;
        let isEmailValid = EmailValidator.validate(value);
        if(isEmailValid){
            this.isSubmitDisabled = false
        }
        else{
            this.isSubmitDisabled = true;
        }
    }

    @action
    onForgotPasswordClick(){
        //ROUTE TO FORGOT PASSWORD PAGE
    }

    @action
    onForgotPasswordSubmit(){
        //SEND RESET PASSWORD OR MAIL WITH PASSWORD

    }

}

export default AuthenticationViewStore;