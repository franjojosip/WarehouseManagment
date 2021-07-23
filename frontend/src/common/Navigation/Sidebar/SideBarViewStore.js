import { action } from "mobx";


class SideBarViewStore {
    constructor(rootStore) {
        this.routerStore = rootStore.routerStore;
        this.onNavigate = this.onNavigate.bind(this);
    }

    @action
    onNavigate(route) {
        console.log(route)
        this.routerStore.goTo(route);
    }

}

export default SideBarViewStore;