import { action, observable } from "mobx";

class CityViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.cityModuleStore.cityDataStore;
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
        this.onCityClicked = this.onCityClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onZipCodeChange = this.onZipCodeChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedCity = {
        id: "",
        name: "",
        zip_code: ""
    };
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Gradovi";
    columns = ['Naziv grada', 'Poštanski broj', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "Osijek", zip_code: "31000" },
        { id: 2, name: "Zagreb", zip_code: "31000" },
        { id: 3, name: "Stari Mikanovci", zip_code: "32284" },
        { id: 4, name: "Bilje", zip_code: "31000" },
        { id: 5, name: "Zagreb", zip_code: "31000" },
        { id: 6, name: "Stari Mikanovci", zip_code: "32284" },
        { id: 7, name: "Bilje", zip_code: "31000" },
        { id: 8, name: "Zagreb", zip_code: "31000" },
        { id: 9, name: "Stari Mikanovci", zip_code: "32284" },
        { id: 10, name: "Bilje", zip_code: "31000" }
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
        console.log(this.clickedCity)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedCity)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedCity)
    }

    @action
    async onFind() {
        //FIND CITY
    };

    @action
    onCityClicked (data, isCreate) {
        if (isCreate) {
            this.clickedCity = {
                id: "",
                name: "",
                zip_code: ""
            };
        }
        else {
            this.clickedCity = {
                id: data.id,
                name: data.name,
                zip_code: data.zip_code
            };
        }

        this.checkFields();
    }

    @action
    setPagination(page) {
        if (page !== null) {
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
            this.rows = [{ id: -1, name: "Nema podataka", zip_code: "" }];
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
    onNameChange(value) {
        this.clickedCity.name = value;
        this.checkFields();
    }

    @action
    onZipCodeChange(value) {
        this.clickedCity.zip_code = value;
        this.checkFields();
    }

    @action
    checkFields() {
        let isValidNumber = /^\d+$/.test(this.clickedCity.zip_code);

        if (this.clickedCity.name.length > 2 && this.clickedCity.zip_code.length === 5 && isValidNumber) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default CityViewStore;