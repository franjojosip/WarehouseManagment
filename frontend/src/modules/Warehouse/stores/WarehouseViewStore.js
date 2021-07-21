import { action, observable } from "mobx";

class WarehouseViewStore {
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
        this.onWarehouseClicked = this.onWarehouseClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onUserRemove = this.onUserRemove.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedWarehouse = {
        id: "",
        name: "",
        city_id: "",
        city_name: "Odaberi grad",
        location_id: "",
        location_name: "Odaberi lokaciju",
        users: []
    };

    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Skladišta";
    columns = ['Naziv skladišta', 'Naziv lokacije', 'Radnici', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "MARTINA DIVALTA 120", location_id: 1, location_name: "Lokacija11", city_id: 1, city_name: "city1", users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 2, name: "Testna ulica 11", location_id: 2, location_name: "Lokacija12", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 3, name: "Sokovi", location_id: 3, location_name: "Lokacija13", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 4, name: "Cigarete", location_id: 2, location_name: "Lokacija14", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 5, name: "Koverta", location_id: 3, location_name: "Lokacija15", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 6, name: "Tst2", location_id: 1, location_name: "Lokacija16", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 7, name: "Test3", location_id: 4, location_name: "Lokacija17", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 8, name: "Test4", location_id: 4, location_name: "Lokacija19", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 9, name: "Tst5", location_id: 2, location_name: "Lokacija112", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] },
        { id: 10, name: "Test6", location_id: 2, location_name: "Lokacija1124", city_id: 1, city_name: "city1",users: [{ name: 'KORISNIK 1', id: 1 }, { name: 'KORISNIK 2️', id: 2 }] }
    ];

    cities = [{
        city_id: 1,
        city_name: "city1"
    }, {
        city_id: 2,
        city_name: "city2"
    }, {
        city_id: 3,
        city_name: "city3"
    }, {
        city_id: 4,
        city_name: "city4"
    }
    ];
    
    @observable filteredLocations = [];

    locations = [{
        location_id: 1,
        location_name: "Lokacija1",
        city_id: 1,
        city_name: "city1"
    }, {
        location_id: 2,
        location_name: "Lokacija12",
        city_id: 2,
        city_name: "city2"
    }, {
        location_id: 3,
        location_name: "Lokacija13",
        city_id: 1,
        city_name: "city1"
    }, {
        location_id: 4,
        location_name: "Lokacija14",
        city_id: 2,
        city_name: "city2"
    }
    ];

    users = [{ name: 'Martin Matić ', id: 1 }, { name: 'KORISNIK 2️', id: 2 },
    { name: 'KORISNIK 3', id: 3 }, { name: 'KORISNIK 4', id: 4 },
    { name: 'KORISNIK 5', id: 5 }, { name: 'KORISNIK 6', id: 6 }];

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
        console.log(this.clickedWarehouse)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedWarehouse)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedWarehouse)
    }

    @action
    async onFind() {
        //FIND Warehouse
    };

    @action
    onWarehouseClicked(data, isCreate) {
        if (isCreate) {
            this.clickedWarehouse = {
                id: "",
                name: "",
                location_id: "",
                location_name: "Odaberi lokaciju",
                city_id: "",
                city_name: "Odaberi lokaciju",
                users: []
            };
        }
        else {
            this.clickedWarehouse = {
                id: data.id,
                name: data.name,
                location_id: data.location_id,
                location_name: data.location_name,
                city_id: data.city_id,
                city_name: data.city_name,
                users: data.users
            };
        }

        this.checkFields();
    }

    @action
    setPagination(page) {
        if (page) {
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
        this.clickedWarehouse.name = value;
        this.checkFields();
    }

    @action
    onCityChange(value) {
        this.clickedWarehouse.city_id = value.city_id;
        this.clickedWarehouse.city_name = value.city_name;
        this.filteredLocations = this.locations.filter(element => element.city_id == this.clickedWarehouse.city_id);
        if(this.filteredLocations.length === 0){
            this.clickedWarehouse.location_id = -1;
            this.clickedWarehouse.location_name = "Odaberi Lokaciju";
        }
        this.checkFields();
    }


    @action
    onLocationChange(value) {
        this.clickedWarehouse.location_id = value.location_id;
        this.clickedWarehouse.location_name = value.location_name;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedWarehouse.name.length > 2  && this.clickedWarehouse.city_id != null && this.clickedWarehouse.location_id != null) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

    @action
    onUserSelect(selectedList, selectedItem) {
        this.clickedWarehouse.users = selectedList;
    }

    @action
    onUserRemove(selectedList, removedItem) {
        this.clickedWarehouse.users = selectedList;
    }

}

export default WarehouseViewStore;