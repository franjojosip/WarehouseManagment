import { action, observable } from "mobx";
import EmailValidator from "email-validator";


class UserViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.authenticationModuleStore.authenticationDataStore;
        this.routerStore = rootStore.routerStore;

        this.onFind = this.onFind.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onChangePageSize = this.onChangePageSize.bind(this);
        this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
        this.onNextPageClick = this.onNextPageClick.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.loadPageData = this.loadPageData.bind(this);
        this.onUserClicked = this.onUserClicked.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedUser = {
        id: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        role_id: "",
        role_name: "Odaberi ulogu"
    };
    @observable clickedRole = {
        role_id: "",
        role_name: "Odaberi ulogu"
    }

    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Korisnici";
    columns = ['Ime i prezime korisnika', 'Email', 'Mobitel', 'Uloga', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, fname: "Martin", lname: "Matic", email: "matic1@mail.com", phone: "0955642525", role_id: 1, role_name: "Administrator", password:"test" },
        { id: 1, fname: "Pero", lname: "Peric", email: "matic2@mail.com", phone: "0955642525", role_id: 2, role_name: "Korisnik", password:"test"  },
        { id: 1, fname: "Marko", lname: "Matic", email: "matic3@mail.com", phone: "0955642525", role_id: 1, role_name: "Administrator", password:"test"  },

    ];

    roles = [{
        role_id: 1,
        role_name: "Administrator"
    }, {
        role_id: 2,
        role_name: "Korisnik"
    }
    ];

    @action
    onDeleteClick() {
        //this.isLoaderVisible = true; //prikaži loader        
        /*
        this.deleteResult = await (this.dataStore.delete(this.itemToDeleteId));
        if (this.deleteResult) {
            this.isDeleting = false;
            toaster.notify('Deletion successful!', {
                duration: 2000
            })
            this.onFind();
        } else {
            toaster.notify('Deletion failed!', {
                duration: 2000
            })
        }
    */
        //this.isLoaderVisible = false; //sakrij loader
        console.log(this.clickedUser)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedUser)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedUser)
    }

    @action
    async onFind() {
        //FIND Location
    };

    @action
    onUserClicked(data, isCreate) {
        if (isCreate) {
            this.clickedUser = {
                id: "",
                fname: "",
                lname: "",
                email: "",
                phone: "",
                password: "",
                role_id: "",
                role_name: "Odaberi ulogu"
            };
        }
        else {
            this.clickedUser = {
                id: data.id,
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role_id: data.role_id,
                role_name: data.role_name
            };
        }

        this.checkFields();
    }

    @action
    setPagination(page) {
        if (page != null) {
            this.page = page;
        }
        this.totalPages = Math.floor(this.allData.length / this.pageSize);
        if (this.allData.length % this.pageSize > 0) {
            this.totalPages = this.totalPages + 1;
        }
        this.previousEnabled = this.page > 1;
        this.nextEnabled = Math.floor(this.allData.length / this.pageSize) > this.page;

        this.loadPageData()
    }

    @action
    loadPageData() {
        if (this.allData.length === 0) {
            this.rows = [{ id: -1, name: "Nema podataka" }];
        }
        else {
            this.rows = this.allData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
        }
    }

    @action
    onPreviousPageClick(currentPage) {
        this.setPagination(currentPage - 1);
    }

    @action
    onNextPageClick(currentPage) {
        this.setPagination(currentPage + 1);
    }

    @action
    onPageClick(currentPage) {
        this.setPagination(currentPage);
    }

    @action
    onChangePageSize(pageSize) {
        this.pageSize = pageSize;
        this.setPagination();
    }


    @action
    onFirstNameChange(value) {
        this.clickedUser.fname = value;
        this.checkFields();
    }

    @action
    onLastNameChange(value) {
        this.clickedUser.lname = value;
        this.checkFields();
    }

    @action
    onEmailChange(value) {
        this.clickedUser.email = value;
        this.checkFields();
    }

    @action
    onPhoneChange(value) {
        this.clickedUser.phone = value;
        this.checkFields();
    }
    
    @action
    onPasswordChange(value) {
        this.clickedUser.password = value;
        this.checkFields();
    }

    @action
    onRoleChange(value) {
        this.clickedUser.role_id = value.role_id;
        this.clickedUser.role_name = value.role_name;
        this.checkFields();
    }

    @action
    checkFields() {
        let isEmailValid = EmailValidator.validate(this.clickedUser.email);
        let isValidPhoneNumber = /^\d+$/.test(this.clickedUser.phone);

        if (this.clickedUser.fname.length > 2
            && this.clickedUser.fname.length > 2
            && this.clickedUser.password.length >= 4
            && this.clickedUser.role_id != null
            && this.clickedUser.phone.length >= 6
            && this.clickedUser.phone.length <= 12
            && isValidPhoneNumber
            && isEmailValid) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default UserViewStore;