import React from 'react';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import LoginPage from "../modules/Auth/pages/Login";
import UserPage from "../modules/Auth/pages/User";
import ForgotPasswordPage from "../modules/Auth/pages/ForgotPassword";
import NotFoundPage from "../modules/NotFound/pages/NotFound";
import CityPage from "../modules/City/pages/City";
import PackagingPage from "../modules/Packaging/pages/Packaging";
import CategoryPage from "../modules/Category/pages/Category";
import SubcategoryPage from "../modules/Subcategory/pages/Subcategory";
import ProductPage from "../modules/Product/pages/Product";
import LocationPage from "../modules/Location/pages/Location";
import WarehousePage from "../modules/Warehouse/pages/Warehouse";
import RecieptPage from "../modules/Reciept/pages/Reciept"

const viewMap = {
    home: <LoginPage />,
    login: <LoginPage />,
    user: <UserPage />,
    forgotpassword: <ForgotPasswordPage />,
    city: <CityPage />,
    packaging: <PackagingPage />,
    category: <CategoryPage />,
    subcategory: <SubcategoryPage />,
    product: <ProductPage />,
    location: <LocationPage />,
    warehouse: <WarehousePage />,
    reciept: <RecieptPage />,
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
