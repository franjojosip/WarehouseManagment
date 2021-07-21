import { action, observable } from "mobx";

class NotificationViewStore {
    constructor(rootStore) {
        this.dataStore = rootStore.notificationModuleStore.notificationDataStore;
        this.routerStore = rootStore.routerStore;

        this.onFind = this.onFind.bind(this);
        this.onChangePageSize = this.onChangePageSize.bind(this);
        this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
        this.onNextPageClick = this.onNextPageClick.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.loadPageData = this.loadPageData.bind(this);
        this.onNotificationClicked = this.onNotificationClicked.bind(this);

        this.setPagination();
    }

    @observable isLoaderVisible = false;

    @observable clickedNotification = {
        id: "",
        email: "",
        notification_name: "",
        notification_type: "",
        date_created: "",
        products: []
    };
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Popis notifikacija";
    columns = ['Naziv notifikacije', 'Tip notifikacije', 'Primatelj', 'Datum slanja', 'Detalji'];

    //TESTNI PODATCI
    allData = [
        { id: 1, email: "email@mail.com", notification_name: "notifikacije1", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 2, email: "email@mail.com", notification_name: "notifikacije121", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 3, email: "email@mail.com", notification_name: "notifikacije Mikanovci", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 4, email: "email@mail.com", notification_name: "notifikaci12je", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 5, email: "email@mail.com", notification_name: "notifikac12ije", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 6, email: "email@mail.com", notification_name: "notifikacije Mikanovci", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 7, email: "email@mail.com", notification_name: "notifikacij1231234e", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 8, email: "email@mail.com", notification_name: "notifikac14514ije", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 9, email: "email@mail.com", notification_name: "notifika12cije Mikanovci", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] },
        { id: 10, email: "email@mail.com", notification_name: "notifikacije", notification_type: "Tjedna notifikacija", date_created: "21.05.2021.", products: ['Pivo', 'Majica', 'Jeger'] }
    ];

    @action
    async onFind() {
        //FIND CITY
    };

    @action
    onNotificationClicked(data) {
        this.clickedNotification = {
            id: data.id,
            email: data.email,
            notification_name: data.notification_name,
            notification_type: data.notification_type,
            date_created: data.date_created,
            products: data.products
        };
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
            this.rows = [{ id: -1, email: "", notification_name: "Nema obavijesti za odabrane postavke", notification_type: "", date_created: "", products: [] }];
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

}

export default NotificationViewStore;