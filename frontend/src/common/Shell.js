import React from 'react';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import LoginPage from "../modules/Auth/pages/Login";
import NotFoundPage from "../modules/NotFound/pages/NotFound";
import CityPage from "../modules/City/pages/City";
import PackagingPage from "../modules/Packaging/pages/Packaging";
import CategoryPage from "../modules/Category/pages/Category";
import SubcategoryPage from "../modules/Subcategory/pages/Subcategory";
import ProductPage from "../modules/Product/pages/Product";
import LocationPage from "../modules/Location/pages/Location";
import WarehousePage from "../modules/Warehouse/pages/Warehouse";

const viewMap = {
    home: <LoginPage />,
    login: <LoginPage />,
    city: <CityPage />,
    packaging: <PackagingPage />,
    category: <CategoryPage />,
    subcategory: <SubcategoryPage />,
    product: <ProductPage />,
    location: <LocationPage />,
    warehouse: <WarehousePage />,
    notFound: <NotFoundPage />
};

export const Shell = inject("rootStore")(
    class extends React.Component {
        render() {
            const { rootStore } = this.props;
            const { routerStore } = rootStore;

            return <RouterView routerStore={routerStore} viewMap={viewMap} />;
        }
    }
);
