import { action, observable } from "mobx";


class SideBarViewStore {
    constructor(rootStore) {
        this.routerStore = rootStore.routerStore;
        this.onNavigate = this.onNavigate.bind(this);
    }

    @observable selectedRoute = "home";

    @action
    onNavigate(route) {
        this.selectedRoute = route;
        this.routerStore.goTo(route);
    }

}

export default SideBarViewStore;