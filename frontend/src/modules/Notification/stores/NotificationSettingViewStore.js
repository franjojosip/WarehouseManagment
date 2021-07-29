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
        this.onNotificationSettingClicked = this.onNotificationSettingClicked.bind(this);
        this.onDayOfWeekChange = this.onDayOfWeekChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onNotificationTypeChange = this.onNotificationTypeChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onNotificationTypeFilterChange = this.onNotificationTypeFilterChange.bind(this);
        this.onResetFilterClick = this.onResetFilterClick.bind(this);


        this.setPagination();
        this.checkFields();
    }

    @observable isLoaderVisible = false;

    @observable clickedNotificationSetting = {
        id: -1,
        day_of_week_id: "",
        day_of_week_name: "Odaberi dan u tjednu",
        time: "",
        email: "email@test.com",
        notification_name: "",
        notification_type_id: -1,
        notification_type_name: "Odaberi tip notifikacije",
        date_created: ""
    };
    @observable isSubmitDisabled = true;


    @observable page = 1;
    @observable pageSize = 5;
    @observable totalPages = 1;
    @observable previousEnabled = false;
    @observable nextEnabled = false;
    @observable rows = [];

    title = "Popis postavki notifikacija";
    columns = ['Tip notifikacije', 'Dan U Tjednu', 'Vrijeme', 'Primatelj', 'Izmjena', 'Brisanje'];

    //TESTNI PODATCI
    @observable response = [
        { id: 1, day_of_week_id: 1, day_of_week_name: "Ponedjeljak", time: "13:00", email: "email@mail.com", notification_name: "notifikacije1", notification_type_id: 1, notification_type_name: "Tjedna notifikacija", date_created: "21.05.2021." },
        { id: 2, day_of_week_id: 1, day_of_week_name: "Ponedjeljak", time: "17:00", email: "email@mail.com", notification_name: "notifikacije121", notification_type_id: 2, notification_type_name: "Mjesečna notifikacija", date_created: "21.05.2021." }
    ];
    allData = [
        { id: 1, day_of_week_id: 1, day_of_week_name: "Ponedjeljak", time: "13:00", email: "email@mail.com", notification_name: "notifikacije1", notification_type_id: 1, notification_type_name: "Tjedna notifikacija", date_created: "21.05.2021." },
        { id: 2, day_of_week_id: 1, day_of_week_name: "Ponedjeljak", time: "17:00", email: "email@mail.com", notification_name: "notifikacije121", notification_type_id: 2, notification_type_name: "Mjesečna notifikacija", date_created: "21.05.2021." }
    ];

    days = [
        { id: 1, name: "Ponedjeljak" },
        { id: 2, name: "Utorak" },
        { id: 3, name: "Srijeda" },
        { id: 4, name: "Četvrtak" },
        { id: 5, name: "Petak" }
    ];

    notification_types = [
        {
            notification_type_id: 1,
            notification_type_name: "Tjedna obavijest",
        },
        {
            notification_type_id: 2,
            notification_type_name: "Mjesečna obavijest",
        }
    ];

    @observable notifcationTypeFilter = {
        id: "",
        name: ""
    }

    @action
    onNotificationTypeFilterChange(value) {
        this.notifcationTypeFilter.id = value.notification_type_id;
        this.notifcationTypeFilter.name = value.notification_type_name;
        if (value.notification_type_id) {
            this.allData = this.response.filter(data => data.notification_type_id === value.notification_type_id);
        }
        else {
            this.allData = this.response;
        }
        this.setPagination(1);
    }

    @action
    onResetFilterClick() {
        this.notifcationTypeFilter.id = "";
        this.notifcationTypeFilter.name = "";
        this.allData = this.response;
        this.setPagination(1);
    }

    @action
    async onFind() {
        //FIND CITY
    };

    @action
    onCreateClick() {

    }
    @action
    onEditClick() {

    }
    @action
    onDeleteClick() {

    }

    @action
    onNotificationSettingClicked(data, isCreate) {
        if (isCreate) {
            this.clickedNotificationSetting = {
                id: -1,
                day_of_week_id: "",
                day_of_week_name: "Odaberi dan u tjednu",
                time: "",
                email: "email@test.com",
                notification_name: "",
                notification_type_id: -1,
                notification_type_name: "Odaberi tip notifikacije",
                date_created: ""
            };
        }
        else {
            this.clickedNotificationSetting = {
                id: data.id,
                day_of_week_id: data.day_of_week_id,
                day_of_week_name: data.day_of_week_name,
                time: data.time,
                email: "email@test.com",
                notification_name: data.notification_name,
                notification_type_id: data.notification_type_id,
                notification_type_name: data.notification_type_name,
                date_created: data.date_created
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

    @action
    onDayOfWeekChange(value) {
        this.clickedNotificationSetting.day_of_week_id = value.id;
        this.clickedNotificationSetting.day_of_week_name = value.name;
        this.checkFields();
    }

    @action
    onTimeChange(value) {
        this.clickedNotificationSetting.time = value;
        this.checkFields();
    }

    @action
    onNotificationTypeChange(value) {
        this.clickedNotificationSetting.notification_type_id = value.notification_type_id;
        this.clickedNotificationSetting.notification_type_name = value.notification_type_name;
        this.checkFields();
    }

    @action
    checkFields() {
        if (this.clickedNotificationSetting.notification_type_id
            && this.clickedNotificationSetting.notification_type_id != -1
            && this.clickedNotificationSetting.day_of_week_id
            && this.clickedNotificationSetting.day_of_week_id != -1
            && this.clickedNotificationSetting.time) {
            this.isSubmitDisabled = false;
        }
        else {
            this.isSubmitDisabled = true;
        }
    }
}

export default NotificationViewStore;