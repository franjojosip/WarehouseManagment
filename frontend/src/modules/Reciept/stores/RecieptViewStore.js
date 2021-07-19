import { action, observable } from "mobx";

class RecieptViewStore {
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
        this.onRecieptClicked = this.onRecieptClicked.bind(this);
        this.onWarehouseChange = this.onWarehouseChange.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.onClickedRow = this.onClickedRow.bind(this);
        this.groupData = this.groupData.bind(this);

        this.groupData();
        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedReciept = {
        id: "",
        name: "",
        warehouse_id: "",
        warehouse_name: "Odaberi skladište",
        product_id: "",
        product_name: "Odaberi proizvod",
        packaging_id: "",
        packaging_name: "Ambalaaža",
        user_id: "1",
        user_name: "Martin Matić",
        quantity: "",
        date_created: "23.02.2021."
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

    title = "Preuzimanja";
    parentColumns = ['Naziv skladišta', 'Korisnik', 'Datum kreiranja'];
    childColumns = ['Naziv proizvoda', 'Naziv ambalaže', 'Količina', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        {
            id: 1,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 1,
            product_name: "proizvod1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 4,
            date_created: "23.02.2021."
        },
        {
            id: 2,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 2,
            product_name: "proizvod2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 14,
            date_created: "23.02.2021."
        },
        {
            id: 3,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 3,
            product_name: "proizvod3",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 2,
            date_created: "24.02.2021."
        },


        {
            id: 4,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 1,
            product_name: "proizvod1",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 4,
            date_created: "23.02.2021."
        },
        {
            id: 5,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 2,
            product_name: "proizvod2",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 14,
            date_created: "23.02.2021."
        },
        {
            id: 6,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 3,
            product_name: "proizvod3",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 1,
            user_name: "Martin Matić",
            quantity: 2,
            date_created: "24.02.2021."
        },
        {
            id: 7,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 3,
            product_name: "proizvod3",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 2,
            user_name: "Stamko Matić",
            quantity: 2,
            date_created: "24.02.2021."
        },
        {
            id: 8,
            warehouse_id: 1,
            warehouse_name: "skladiste1",
            product_id: 5,
            product_name: "proizvod5",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 2,
            user_name: "Stamko Matić",
            quantity: 2,
            date_created: "24.02.2021."
        },
        {
            id: 8,
            warehouse_id: 2,
            warehouse_name: "skladiste2",
            product_id: 5,
            product_name: "proizvod5",
            packaging_id: 1,
            packaging_name: "ambalaza1",
            user_id: 2,
            user_name: "Stamko Matić",
            quantity: 2,
            date_created: "24.02.2021."
        },

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
        console.log(this.clickedReciept)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedReciept)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedReciept)
    }

    @action
    async onFind() {
        //FIND Reciept
    };

    @action
    onRecieptClicked(clickedData, isCreate) {
        if (isCreate) {
            console.log("ISCREATE");
            this.clickedReciept = {
                warehouse_id: -1,
                warehouse_name: "Odaberi skladište",
                product_id: -1,
                product_name: "Odaberi proizvod",
                packaging_id: "",
                packaging_name: "",
                user_id: "",
                user_name: "",
                quantity: ""
            };
        }
        else {
            let data = clickedData.data[0];
            this.clickedReciept = {
                id: data.id,
                warehouse_id: data.warehouse_id,
                warehouse_name: data.warehouse_name,
                product_id: data.product_id,
                product_name: data.product_name,
                packaging_id: data.packaging_id,
                packaging_name: data.packaging_name,
                user_id: data.user_id,
                user_name: data.user_name,
                quantity: data.quantity,
                date_created: data.date_created
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
        this.clickedReciept.warehouse_id = value.warehouse_id;
        this.clickedReciept.warehouse_name = value.warehouse_name;
        this.checkFields();
    }

    @action
    onProductChange(value) {
        this.clickedReciept.product_id = value.product_id;
        this.clickedReciept.product_name = value.product_name;
        this.checkFields();
    }

    @action
    onQuantityChange(value) {
        this.clickedReciept.quantity = value;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedReciept.warehouse_id != -1
            && this.clickedReciept.product_id != -1
            && this.clickedReciept.quantity > 0) {
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
            var key = element.warehouse_id + '-' + element.user_id + '-' + element.date_created;
            if (this.grouppedData.findIndex((element) => element.name.toString() === key.toString()) === -1) {
                this.grouppedData.push({ name: key, data: [] });
            }
            let index = this.grouppedData.findIndex((element) => element.name.toString() === key.toString())
            this.grouppedData[index].data.push(element);
        })
    }

}

export default RecieptViewStore;