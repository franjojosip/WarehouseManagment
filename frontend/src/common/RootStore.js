import { RouterState, RouterStore } from "mobx-state-router";
import { routes } from "./Routes";
import AuthenticationModuleStore from "../modules/Auth/stores/AuthenticationModuleStore";
import CityModuleStore from "../modules/City/stores/CityModuleStore";
import PackagingModuleStore from "../modules/Packaging/stores/PackagingModuleStore";
import CategoryModuleStore from "../modules/Category/stores/CategoryModuleStore";
import SubcategoryModuleStore from "../modules/Subcategory/stores/SubcategoryModuleStore";
import ProductModuleStore from "../modules/Product/stores/ProductModuleStore";
import LocationModuleStore from "../modules/Location/stores/LocationModuleStore";
import WarehouseModuleStore from "../modules/Warehouse/stores/WarehouseModuleStore";

const notFound = new RouterState('notFound');

export default class RootStore {
    routerStore = new RouterStore(this, routes, notFound);
    
    constructor() {
        this.authenticationModuleStore = new AuthenticationModuleStore(this);
        this.cityModuleStore = new CityModuleStore(this);
        this.packagingModuleStore = new PackagingModuleStore(this);
        this.categoryModuleStore = new CategoryModuleStore(this);
        this.subcategoryModuleStore = new SubcategoryModuleStore(this);
        this.productModuleStore = new ProductModuleStore(this);
        this.locationModuleStore = new LocationModuleStore(this);
        this.warehouseModuleStore = new WarehouseModuleStore(this);
    }
}