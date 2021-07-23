import { action, observable } from "mobx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        this.delay = this.delay.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.processData = this.processData.bind(this);

        this.setPagination();
        this.onFind();
    }

    @observable isLoaderVisible = false;
    @observable isSubmitDisabled = true;

    @observable clickedCity = {
        id: "",
        name: "",
        zip_code: ""
    };

    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Gradovi";
    columns = ['Naziv grada', 'Poštanski broj', 'Izmjena', 'Brisanje'];

    @observable allData = [];

    @action
    async showLoader() {
        this.isLoaderVisible = true;
        await this.delay(500);
    }

    @action
    hideLoader() {
        this.isLoaderVisible = false;
    }

    @action
    processData(response) {
        if (response.error) {
            toast.error(response.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
        }
        else {
            toast.success(response.status, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            this.onFind();
        }
    }

    @action
    async onDeleteClick() {
        this.showLoader();
        let response = await (this.dataStore.delete(this.clickedCity.id));
        this.processData(response);
        this.hideLoader();
    }

    @action
    async onEditClick() {
        this.showLoader();
        let response = await (this.dataStore.update(this.clickedCity));
        this.processData(response);
        this.hideLoader();
    }

    @action
    async onCreateClick() {
        this.showLoader();
        let response = await (this.dataStore.create(this.clickedCity));
        this.processData(response);
        this.hideLoader();
    }

    @action
    async onFind() {
        this.showLoader();
        let response = await (this.dataStore.get())
        if (response.error) {
            toast.error(response.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            this.allData = [{ id: "", name: "Neuspješno učitavanje podataka", zip_code: "" }];
        }
        else {
            if (response.cities.length > 0) {
                this.allData = response.cities;
            }
            else {
                this.allData = [{ id: "", name: "Nema podataka", zip_code: "" }];
            }
        }
        this.setPagination();
        this.hideLoader();
    };

    @action
    delay(delayInMs) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(2);
            }, delayInMs);
        });
    }

    @action
    onCityClicked(data, isCreate) {
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
        this.rows = this.allData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
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

        if (this.clickedCity.name.length > 2
            && this.clickedCity.zip_code.toString().length == 5
            && isValidNumber
            && this.clickedCity.zip_code >= 10000
            && this.clickedCity.zip_code <= 54000) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default CityViewStore;