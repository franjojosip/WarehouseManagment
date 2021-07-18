import BaseForm from '../../../common/components/BaseForm';


export default class LoginForm extends BaseForm {
    constructor({values, hooks}) {
        const fields = ["email", "password"];
        const placeholder = {
            "email": "Unesite email",
            "password": "Enter abbreviation"
        };
        const labels = {
            "email": "Email",
            "password": "Lozinka"
        };
        const rules = {
            "email": 'required|string|email',
            "password": 'required|string|password'
        };
        super({values, hooks, fields, placeholder, labels, rules});
    }
}
