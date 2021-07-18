import { action, observable } from "mobx";

class LocationViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.packagingModuleStore.packagingDataStore;
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
        this.onLocationClicked = this.onLocationClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedLocation = {
        id: "",
        name: "",
        city_id: "",
        city_name: "Odaberi grad"
    };
    @observable clickedCategory = {
        city_id: "",
        city_name: "Odaberi grad"
    }
    
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Lokacije";
    columns = ['Naziv ulice', 'Naziv grada', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "MARTINA DIVALTA 120", city_id: 1, city_name: "Grad1" },
        { id: 2, name: "Testna ulica 11", city_id: 2, city_name: "Grad2" },
        { id: 3, name: "Sokovi", city_id: 3, city_name: "Grad3" },
        { id: 4, name: "Cigarete", city_id: 2, city_name: "Grad4" },
        { id: 5, name: "Koverta", city_id: 3, city_name: "Grad45" },
        { id: 6, name: "Tst2", city_id: 1, city_name: "Grad6" },
        { id: 7, name: "Test3", city_id: 4, city_name: "test4" },
        { id: 8, name: "Test4", city_id: 4, city_name: "test4" },
        { id: 9, name: "Tst5", city_id: 2, city_name: "test2" },
        { id: 10, name: "Test6", city_id: 2, city_name: "test2" }
    ];

    cities = [{
        city_id: 1,
        city_name: "Grad1"
    }, {
        city_id: 2,
        city_name: "Grad2"
    }, {
        city_id: 3,
        city_name: "Grad3"
    }, {
        city_id: 4,
        city_name: "test4"
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
        console.log(this.clickedLocation)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedLocation)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedLocation)
    }

    @action
    async onFind() {
        //FIND Location
    };

    @action
    onLocationClicked(data, isCreate) {
        if (isCreate) {
            this.clickedLocation = {
                id: "",
                name: "",
                city_id: "",
                city_name: "Odaberi grad"
            };
        }
        else {
            this.clickedLocation = {
                id: data.id,
                name: data.name,
                city_id: data.city_id,
                city_name: data.city_name
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
    onNameChange(value) {
        this.clickedLocation.name = value;
        this.checkFields();
    }

    @action
    onCityChange(value) {
        this.clickedLocation.city_id = value.city_id;
        this.clickedLocation.city_name = value.city_name;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedLocation.name.length > 2 && this.clickedLocation.city_id != null) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default LocationViewStore;