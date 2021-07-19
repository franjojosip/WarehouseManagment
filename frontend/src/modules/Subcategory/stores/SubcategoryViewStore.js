import { action, observable } from "mobx";

class SubcategoryViewStore {
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
        this.onSubcategoryClicked = this.onSubcategoryClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedSubcategory = {
        id: "",
        name: "",
        category_id: "",
        category_name: "Odaberi kategoriju"
    };
    @observable clickedCategory = {
        category_id: "",
        category_name: "Odaberi kategoriju"
    }
    
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Potkategorije";
    columns = ['Naziv potkategorije', 'Naziv kategorije', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "Piće", category_id: 1, category_name: "test1" },
        { id: 2, name: "Rekviziti", category_id: 2, category_name: "test2" },
        { id: 3, name: "Sokovi", category_id: 3, category_name: "test3" },
        { id: 4, name: "Cigarete", category_id: 2, category_name: "test2" },
        { id: 5, name: "Koverta", category_id: 3, category_name: "test3" },
        { id: 6, name: "Tst2", category_id: 1, category_name: "test1" },
        { id: 7, name: "Test3", category_id: 4, category_name: "test4" },
        { id: 8, name: "Test4", category_id: 4, category_name: "test4" },
        { id: 9, name: "Tst5", category_id: 2, category_name: "test2" },
        { id: 10, name: "Test6", category_id: 2, category_name: "test2" }
    ];

    categories = [{
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
        console.log(this.clickedSubcategory)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedSubcategory)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedSubcategory)
    }

    @action
    async onFind() {
        //FIND Subcategory
    };

    @action
    onSubcategoryClicked(data, isCreate) {
        if (isCreate) {
            this.clickedSubcategory = {
                id: "",
                name: "",
                category_id: "",
                category_name: "Odaberi kategoriju"
            };
        }
        else {
            this.clickedSubcategory = {
                id: data.id,
                name: data.name,
                category_id: data.category_id,
                category_name: data.category_name
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
        this.clickedSubcategory.name = value;
        this.checkFields();
    }

    @action
    onCategoryChange(value) {
        this.clickedSubcategory.category_id = value.category_id;
        this.clickedSubcategory.category_name = value.category_name;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedSubcategory.name.length > 2 && this.clickedSubcategory.category_id != null) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default SubcategoryViewStore;