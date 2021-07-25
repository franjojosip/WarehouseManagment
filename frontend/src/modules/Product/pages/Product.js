import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import ProductViewStore from '../stores/ProductViewStore'
import Table from '../../../common/layouts/Table';
import ModalProduct from '../components/ModalProduct';
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/Product.css";

@inject(
    i => ({
        viewStore: new ProductViewStore(i.rootStore)
    })
)

@observer
class Product extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, title, clickedProduct, onCategoryChange, onSubcategoryChange, onPackagingChange, columns, rows, categories, filteredSubcategories, packagings, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onProductClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.category_name}</td>
                <td className="pt-3-half">{element.subcategory_name}</td>
                <td className="pt-3-half">{element.packaging_name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onProductClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                    Izmijeni
                                </button>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-remove">
                                <button type="button" onClick={() => onProductClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                    Obriši
                                </button>
                            </span>
                            :
                            null
                    }
                </td>
            </tr>);
        });

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalProduct modalTarget="modalTargetAdd" errorMessage={errorMessage} categories={categories} subcategories={filteredSubcategories} packagings={packagings} onSubmit={onCreateClick} name={clickedProduct.name} category_name={clickedProduct.category_name} subcategory_name={clickedProduct.subcategory_name} packaging_name={clickedProduct.packaging_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} onSubcategoryChange={onSubcategoryChange} onPackagingChange={onPackagingChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalProduct modalTarget="modalTargetEdit" errorMessage={errorMessage} categories={categories} subcategories={filteredSubcategories} packagings={packagings} onSubmit={onEditClick} name={clickedProduct.name} category_name={clickedProduct.category_name} subcategory_name={clickedProduct.subcategory_name} packaging_name={clickedProduct.packaging_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} onSubcategoryChange={onSubcategoryChange} onPackagingChange={onPackagingChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalProduct modalTarget="modalTargetDelete" errorMessage={errorMessage} categories={categories} subcategories={filteredSubcategories} packagings={packagings} onSubmit={onDeleteClick} name={clickedProduct.name} category_name={clickedProduct.category_name} subcategory_name={clickedProduct.subcategory_name} packaging_name={clickedProduct.packaging_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} onSubcategoryChange={onSubcategoryChange} onPackagingChange={onPackagingChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onProductClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Product;