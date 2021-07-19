import { action, observable } from "mobx";

class StockViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.recieptModuleStore.recieptDataStore;
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
        this.onStockClicked = this.onStockClicked.bind(this);
        this.onWarehouseChange = this.onWarehouseChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.onMinimumQuantityChange = this.onMinimumQuantityChange.bind(this);
        this.onClickedRow = this.onClickedRow.bind(this);
        this.onClickedNestedRow = this.onClickedNestedRow.bind(this);
        this.groupData = this.groupData.bind(this);
        this.groupCategoryData = this.groupCategoryData.bind(this);

        this.groupData();
        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedStock = {
        id: "",
        name: "",
        warehouse_id: "",
        warehouse_name: "Odaberi skladište",
        product_id: "",
        product_name: "Odaberi proizvod",
        quantity: "",
        min_quantity: ""
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
    @observable clickedNestedRows = [];

    @observable paginatedData = [];

    title = "Stanje proizvoda u skladištima";
    parentColumns = ['Naziv Skladišta', 'Lokacija Skladišta', 'Grad'];
    childColumns = ['Naziv Kategorije'];
    nestedChildColumns = ['Naziv Proizvoda', 'Naziv Ambalaže', 'Količina', 'Minimalna Količina', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        {
            id: 1,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 1,
            product_name: "proizvod1",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 2,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 1,
            product_name: "proizvod1",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 4,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 5,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 6,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 7,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 3,
            product_name: "proizvod3",
            category_id: 2,
            category_name: "kategorija2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 8,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            location_id: 1,
            location_name: "Martina Divalta 12",
            city_id: 1,
            city_name: "Osijek",
            product_id: 4,
            product_name: "proizvod4",
            category_id: 2,
            category_name: "kategorija2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 1,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 1,
            product_name: "proizvod1",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 2,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 1,
            product_name: "proizvod1",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 4,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 5,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 6,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 2,
            product_name: "proizvod2",
            category_id: 1,
            category_name: "kategorija1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 6,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 3,
            product_name: "proizvod3",
            category_id: 2,
            category_name: "kategorija2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
        {
            id: 6,
            warehouse_id: 2,
            warehouse_name: "skladiste12",
            location_id: 1,
            location_name: "Martina Divalta 22",
            city_id: 1,
            city_name: "Osijek",
            product_id: 4,
            product_name: "proizvod4",
            category_id: 2,
            category_name: "kategorija2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            quantity: 4,
            min_quantity: 1
        },
    ];

    @observable filteredWarehouses = [];
    warehouses = [{
        warehouse_id: 1,
        warehouse_name: "skladiste1",
        location_id: 1
    }, {
        warehouse_id: 2,
        warehouse_name: "skladiste2",
        location_id: 1
    }, {
        warehouse_id: 3,
        warehouse_name: "skladiste3",
        location_id: 3
    }
    ];

    @observable filteredCities = [];
    cities = [{
        city_id: 1,
        city_name: "city1"
    }, {
        city_id: 2,
        city_name: "city12"
    }, {
        city_id: 3,
        city_name: "city13"
    }
    ];


    @observable filteredLocations = [];
    locations = [{
        location_id: 1,
        location_name: "location1",
        city_id: 1
    }, {
        location_id: 2,
        location_name: "location2",
        city_id: 2
    }, {
        location_id: 3,
        location_name: "location3",
        city_id: 1
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
        console.log(this.clickedStock)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedStock)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedStock)
    }

    @action
    async onFind() {
        //FIND Stock
    };

    @action
    onStockClicked(clickedData, isCreate) {
        if (isCreate) {
            this.clickedStock = {
                warehouse_id: -1,
                warehouse_name: "Odaberi skladište",
                city_id: -1,
                city_name: "Odaberi grad",
                location_id: -1,
                location_name: "Odaberi lokaciju",
                product_id: -1,
                product_name: "Odaberi proizvod",
                packaging_id: "",
                packaging_name: "",
                quantity: "",
                min_quantity: ""
            };
            this.filteredCities = this.cities;
        }
        else {
            let data = clickedData.data[0];
            this.clickedStock = {
                id: data.id,
                warehouse_id: data.warehouse_id,
                warehouse_name: data.warehouse_name,
                city_id: data.location_id,
                city_name: data.location_name,
                location_id: data.location_id,
                location_name: data.location_name,
                product_id: data.product_id,
                product_name: data.product_name,
                packaging_id: data.packaging_id,
                packaging_name: data.packaging_name,
                quantity: data.quantity,
                min_quantity: data.min_quantity
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
        this.clickedStock.warehouse_id = value.warehouse_id;
        this.clickedStock.warehouse_name = value.warehouse_name;
        this.checkFields();
    }


    @action
    onLocationChange(value) {
        this.clickedStock.location_id = value.location_id;
        this.clickedStock.location_name = value.location_name;
        this.filterFields();
        this.checkFields();
    }


    @action
    onCityChange(value) {
        this.clickedStock.city_id = value.city_id;
        this.clickedStock.city_name = value.city_name;
        this.filterFields();
        this.checkFields();
    }

    filterFields() {
        this.filteredLocations = this.locations.filter((element) => element.city_id == this.clickedStock.city_id);
        this.filteredWarehouses = this.warehouses.filter((element) => element.location_id == this.clickedStock.location_id);

        if (this.filteredLocations.findIndex(location => location.location_id == this.clickedStock.location_id) == -1) {
            this.clickedStock.location_id = -1;
            this.clickedStock.location_name = "Odaberi lokaciju";
            this.clickedStock.warehouse_id = -1;
            this.clickedStock.warehouse_name = "Odaberi skladište";
        }
    }


    @action
    onMinimumQuantityChange(value) {
        this.clickedStock.min_quantity = value;
        this.checkFields();
    }

    @action
    onProductChange(value) {
        //POTREBNO PROVJERITI DA OVO SKLADIŠTE VEĆ NEMA TAJ PROIZVOD!!!
        this.clickedStock.product_id = value.product_id;
        this.clickedStock.product_name = value.product_name;
        this.checkFields();
    }

    @action
    onQuantityChange(value) {
        this.clickedStock.quantity = value;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedStock.warehouse_id != -1
            && this.clickedStock.product_id != -1
            && this.clickedStock.location_id != -1
            && this.clickedStock.city_id != -1
            && this.clickedStock.quantity > 0
            && this.clickedStock.min_quantity > 0) {
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
    onClickedNestedRow(key) {
        if (!this.clickedNestedRows.includes(key)) {
            this.clickedNestedRows.push(key);
        }
        else {
            const index = this.clickedNestedRows.indexOf(key);
            if (index > -1) {
                this.clickedNestedRows.splice(index, 1);
            }
        }
    }

    @action
    groupData() {
        this.grouppedData = [];


        this.allData.forEach(element => {
            var key = element.warehouse_id;
            if (this.grouppedData.findIndex((element) => element.name.toString() === key.toString()) === -1) {
                this.grouppedData.push({ name: key, data: [], grouppedCategoryData: [] });
            }
            let index = this.grouppedData.findIndex((element) => element.name.toString() === key.toString())
            this.grouppedData[index].data.push(element);
        })

        this.grouppedData.forEach((element, i) => {
            this.grouppedData[i].grouppedCategoryData = this.groupCategoryData(element.data);
        })

    }

    @action
    groupCategoryData(products) {
        let grouppedCategoryData = [];

        products.forEach(element => {
            var key = element.category_id;
            if (grouppedCategoryData.findIndex((element) => element.name.toString() === key.toString()) === -1) {
                grouppedCategoryData.push({ name: key, data: [] });
            }
            let index = grouppedCategoryData.findIndex((element) => element.name.toString() === key.toString())
            grouppedCategoryData[index].data.push(element);
        });
        return grouppedCategoryData;
    }

}

export default StockViewStore;