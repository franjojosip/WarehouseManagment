import { action, observable } from "mobx";

class ProductViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.productModuleStore.productDataStore;
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
        this.onProductClicked = this.onProductClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onSubcategoryChange = this.onSubcategoryChange.bind(this);
        this.onPackagingChange = this.onPackagingChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedProduct = {
        id: "",
        name: "",
        category_id: -1,
        category_name: "",
        subcategory_id: -1,
        subcategory_name: "",
        packaging_id: -1,
        packaging_name: ""
    };
    @observable clickedCategory = {
        category_id: -1,
        category_name: ""
    }
    @observable clickedSubcategory = {
        subcategory_id: -1,
        subcategory_name: ""
    }
    @observable clickedPackaging = {
        packaging_id: -1,
        packaging_name: ""
    }

    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Proizvodi";
    columns = ['Naziv proizvoda', 'Naziv kategorije', 'Naziv potkategorije', 'Naziv ambalaže', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "Piće", category_id: 1, category_name: "test1", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 2, name: "Rekviziti", category_id: 2, category_name: "test2", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 3, name: "Sokovi", category_id: 3, category_name: "test3", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 4, name: "Cigarete", category_id: 2, category_name: "test2", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 5, name: "Koverta", category_id: 3, category_name: "test3", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 6, name: "Tst2", category_id: 1, category_name: "test1", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 7, name: "Test3", category_id: 4, category_name: "test4", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 8, name: "Test4", category_id: 4, category_name: "test4", subcategory_id: 1, subcategory_name: "test1", packaging_id: 1, packaging_name: "test1" },
        { id: 9, name: "Tst5", category_id: 2, category_name: "test2", subcategory_id: 1, subcategory_name: "test1", packaging_id: null, packaging_name: "" },
        { id: 10, name: "Test6", category_id: 2, category_name: "test2", subcategory_id: null, subcategory_name: "", packaging_id: 1, packaging_name: "test1" }
    ];

    categories = [{
        category_id: -1,
        category_name: "Odaberi kategoriju"
    },
    {
        category_id: 1,
        category_name: "test1"
    }, {
        category_id: 2,
        category_name: "test2"
    }, {
        category_id: 3,
        category_name: "test3"
    }, {
        category_id: 4,
        category_name: "test4"
    }
    ];

    subcategories = [{
        subcategory_id: -1,
        subcategory_name: "Odaberi potkategoriju"
    },
    {
        subcategory_id: 1,
        subcategory_name: "Rekviziti"
    }, {
        subcategory_id: 2,
        subcategory_name: "Sokovi"
    }, {
        subcategory_id: 3,
        subcategory_name: "Cigarete"
    }, {
        subcategory_id: 4,
        subcategory_name: "Pićence"
    }
    ];

    packagings = [{
        packaging_id: -1,
        packaging_name: "Odaberi ambalažu"
    },
    {
        packaging_id: 1,
        packaging_name: "test1"
    }, {
        packaging_id: 2,
        packaging_name: "test2"
    }, {
        packaging_id: 3,
        packaging_name: "test3"
    }, {
        packaging_id: 4,
        packaging_name: "test4"
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
        console.log(this.clickedProduct)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedProduct)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedProduct)
    }

    @action
    async onFind() {
        //FIND Product
    };

    @action
    onProductClicked(data, isCreate) {
        if (isCreate) {
            this.clickedProduct = {
                id: "",
                name: "",
                category_id: "",
                category_name: "Odaberi kategoriju",
                subcategory_id: "",
                subcategory_name: "Odaberi potkategoriju",
                packaging_id: "",
                packaging_name: "Odaberi ambalažu"
            };
        }
        else {
            this.clickedProduct = {
                id: data.id,
                name: data.name,
                category_id: data.category_id,
                category_name: data.category_name,
                subcategory_id: data.subcategory_id,
                subcategory_name: data.subcategory_name,
                packaging_id: data.packaging_id,
                packaging_name: data.packaging_name
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
        this.clickedProduct.name = value;
        this.checkFields();
    }

    @action
    onCategoryChange(value) {
        this.clickedProduct.category_id = value.category_id;
        this.clickedProduct.category_name = value.category_name;
        this.checkFields();
    }

    @action
    onSubcategoryChange(value) {
        this.clickedProduct.subcategory_id = value.subcategory_id;
        this.clickedProduct.subcategory_name = value.subcategory_name;
    }

    @action
    onPackagingChange(value) {
        this.clickedProduct.packaging_id = value.packaging_id;
        this.clickedProduct.packaging_name = value.packaging_name;
    }

    @action
    checkFields() {
        console.log("Category ID: " + this.clickedProduct.category_id);
        if (this.clickedProduct.name.length > 2 && this.clickedProduct.category_id !== -1 && this.clickedProduct.category_id.length !== 0) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default ProductViewStore;