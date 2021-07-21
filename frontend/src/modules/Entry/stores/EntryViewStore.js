import { action, observable } from "mobx";

class EntryViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.entryModuleStore.entryDataStore;
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
        this.onEntryClicked = this.onEntryClicked.bind(this);
        this.onWarehouseChange = this.onWarehouseChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
        this.onPackagingChange = this.onPackagingChange.bind(this);
        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.onClickedRow = this.onClickedRow.bind(this);
        this.groupData = this.groupData.bind(this);

        this.groupData();
        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedEntry = {
        id: "",
        warehouse_id: "",
        warehouse_name: "",
        location_id: "",
        location_name: "",
        product_id: "",
        product_name: "",
        packaging_id: "",
        packaging_name: "",
        quantity: "",
        date_created: ""
    };
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];
    @observable grouppedData = [];

    @observable clickedRows = [];
    @observable paginatedData = [];

    title = "Unos proizvoda na stanje";
    parentColumns = ['Naziv skladišta', 'Lokacija', 'Grad', 'Datum kreiranja'];
    childColumns = ['Naziv proizvoda', 'Naziv ambalaže', 'Količina'];

    //TESTNI PODATCI
    allData = [
        { id: 1, warehouse_id: 1, warehouse_name: "Skladiste1", city_id: 1, city_name: "Osijek", location_id: 1, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 2, warehouse_id: 1, warehouse_name: "Skladiste1", city_id: 1, city_name: "Osijek", location_id: 2, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 3, warehouse_id: 2, warehouse_name: "Skladiste2", city_id: 1, city_name: "Osijek", location_id: 2, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 4, warehouse_id: 2, warehouse_name: "Skladiste2", city_id: 1, city_name: "Osijek", location_id: 3, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 5, warehouse_id: 3, warehouse_name: "Skladiste3", city_id: 1, city_name: "Osijek", location_id: 3, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 6, warehouse_id: 1, warehouse_name: "Skladiste1", city_id: 1, city_name: "Osijek", location_id: 1, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." },
        { id: 7, warehouse_id: 1, warehouse_name: "Skladiste1", city_id: 1, city_name: "Osijek", location_id: 1, location_name: "lokjacija1", product_id: 1, product_name: "product1", packaging_id: 1, packaging_name: "packaging_name", quantity: 1, date_created: "15.02.2021." }
    ];


    warehouses = [{
        warehouse_id: 1,
        warehouse_name: "skladiste1"
    }, {
        warehouse_id: 3,
        warehouse_name: "skladiste2"
    }, {
        warehouse_id: 3,
        warehouse_name: "skladiste3"
    }
    ];

    locations = [{
        location_id: 1,
        location_name: "location1",
        city_id: 2,
        city_name: "city_name2"
    }, {
        location_id: 3,
        location_name: "location12",
        city_id: 1,
        city_name: "city_name1"
    }, {
        location_id: 3,
        location_name: "location13",
        city_id: 1,
        city_name: "city_name1"
    }
    ];

    cities = [{
        city_id: 1,
        city_name: "city_name1"
    }, {
        city_id: 3,
        city_name: "city_name2"
    }, {
        city_id: 3,
        city_name: "city_name3"
    }
    ];

    products = [{
        product_id: 1,
        product_name: "proizvod1"
    }, {
        product_id: 2,
        product_name: "proizvod2"
    }, {
        product_id: 3,
        product_name: "proizvod3"
    }
    ];

    packagings = [{
        packaging_id: 1,
        packaging_name: "proizvod1"
    }, {
        packaging_id: 2,
        packaging_name: "proizvod2"
    }, {
        packaging_id: 3,
        packaging_name: "proizvod3"
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
        console.log(this.clickedEntry)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedEntry)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedEntry)
    }

    @action
    async onFind() {
        //FIND CITY
    };

    @action
    onEntryClicked(clickedData, isCreate) {
        if (isCreate) {
            this.clickedEntry = {
                warehouse_id: -1,
                warehouse_name: "Odaberi skladište",
                city_id: -1,
                city_name: "Odaberi grad",
                location_id: -1,
                location_name: "Odaberi lokaciju",
                product_id: -1,
                product_name: "Odaberi proizvod",
                packaging_id: -1,
                packaging_name: "Odaberi ambalažu",
                quantity: 0,
                date_created: ""
            };
        }
        else {
            let data = clickedData.data[0];
            this.clickedEntry = {
                warehouse_id: data.warehouse_id,
                warehouse_name: data.warehouse_name,
                city_id: data.city_id,
                city_name: data.city_name,
                location_id: data.location_id,
                location_name: data.location_name,
                product_id: data.product_id,
                product_name: data.product_name,
                packaging_id: data.packaging_id,
                packaging_name: data.packaging_name,
                quantity: 4,
                date_created: "23.02.2021."
            };
        }

        this.checkFields();
    }

    @action
    setPagination(page) {
        if (page) {
            this.page = page;
        }
        this.totalPages = Math.floor(this.grouppedData.length / this.pageSize);
        if (this.grouppedData.length % this.pageSize > 0 || this.grouppedData.length === 0) {
            this.totalPages = this.totalPages + 1;
        }
        this.previousEnabled = this.page > 1;
        this.nextEnabled = Math.floor(this.grouppedData.length / this.pageSize) > this.page;

        this.loadPageData()
    }

    @action
    loadPageData() {
        if (this.grouppedData.length === 0) {
            this.paginatedData = [];
        }
        else {
            this.paginatedData = this.grouppedData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
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
    onWarehouseChange(value) {
        this.clickedEntry.warehouse_id = value.warehouse_id;
        this.clickedEntry.warehouse_name = value.warehouse_name;
        this.checkFields();
    }

    @action
    onCityChange(value) {
        this.clickedEntry.city_id = value.city_id;
        this.clickedEntry.city_name = value.city_name;
        this.checkFields();
    }


    @action
    onLocationChange(value) {
        this.clickedEntry.location_id = value.plocation_id;
        this.clickedEntry.location_name = value.location_name;
        this.checkFields();
    }

    @action
    onProductChange(value) {
        this.clickedEntry.product_id = value.product_id;
        this.clickedEntry.product_name = value.product_name;
        this.checkFields();
    }

    @action
    onPackagingChange(value) {
        this.clickedEntry.packaging_id = value.packaging_id;
        this.clickedEntry.packaging_name = value.packaging_name;
        this.checkFields();
    }

    @action
    onQuantityChange(value) {
        this.clickedEntry.quantity = value;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedEntry.warehouse_id != -1
            && this.clickedEntry.city_id != -1
            && this.clickedEntry.location_id != -1
            && this.clickedEntry.product_id != -1
            && this.clickedEntry.packaging_id != -1
            && this.clickedEntry.quantity > 0) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

    @action
    onClickedRow(key) {
        if (!this.clickedRows.includes(key)) {
            this.clickedRows.push(key);
        }
        else {
            const index = this.clickedRows.indexOf(key);
            if (index > -1) {
                this.clickedRows.splice(index, 1);
            }
        }
    }

    @action
    groupData() {
        this.grouppedData = [];

        this.allData.forEach(element => {
            var key = element.warehouse_id + '-' + element.date_created;
            if (this.grouppedData.findIndex((element) => element.name.toString() === key.toString()) === -1) {
                this.grouppedData.push({ name: key, data: [] });
            }
            let index = this.grouppedData.findIndex((element) => element.name.toString() === key.toString())
            this.grouppedData[index].data.push(element);
        })
    }

}

export default EntryViewStore;