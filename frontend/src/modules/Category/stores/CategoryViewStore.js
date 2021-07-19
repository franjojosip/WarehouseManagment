import { action, observable } from "mobx";

class CategoryViewStore {
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
        this.onCategoryClicked = this.onCategoryClicked.bind(this);
        this.onNameChange = this.onNameChange.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedCategory = {
        id: "",
        name: ""
    };
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Kategorije";
    columns = ['Naziv kategorije', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    allData = [
        { id: 1, name: "Piće" },
        { id: 2, name: "Rekviziti" },
        { id: 3, name: "Sokovi" },
        { id: 4, name: "Cigarete" },
        { id: 5, name: "Koverta" },
        { id: 6, name: "Tst2" },
        { id: 7, name: "Test3" },
        { id: 8, name: "Test4" },
        { id: 9, name: "Tst5" },
        { id: 10, name: "Test6" }
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
        console.log(this.clickedCategory)
    }

    @action
    onEditClick() {
        //EDIT DATA
        console.log(this.clickedCategory)
    }

    @action
    onCreateClick() {
        //CREATE DATA
        console.log(this.clickedCategory)
    }

    @action
    async onFind() {
        //FIND Category
    };

    @action
    onCategoryClicked(data, isCreate) {
        if (isCreate) {
            this.clickedCategory = {
                id: "",
                name: ""
            };
        }
        else {
            this.clickedCategory = {
                id: data.id,
                name: data.name
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
            this.rows = [{ id: -1, name: "Nema podataka"}];
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
        this.clickedCategory.name = value;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedCategory.name.length > 2) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }

}

export default CategoryViewStore;