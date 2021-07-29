import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import ProductViewStore from '../stores/ProductViewStore'
import Table from '../../../common/layouts/Table';
import ModalProduct from '../components/ModalProduct';
import { ToastContainer } from 'react-toastify';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../styles/Product.css";

@inject(
    i => ({
        viewStore: new ProductViewStore(i.rootStore)
    })
)

@observer
class Product extends React.Component {
    render() {
        const { isLoaderVisible, productFilter, onResetFilterClick, subcategories, onCategoryFilterChange, onSubcategoryFilterChange, onPackagingFilterChange, errorMessage, title, clickedProduct, onCategoryChange, onSubcategoryChange, onPackagingChange, columns, rows, categories, filteredSubcategories, packagings, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onProductClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

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
        let categoryFilterDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={productFilter.category_name ? productFilter.category_name : "Sve kategorije"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_category" onSelect={() => onCategoryFilterChange({ category_id: "", category_name: "" })}>Sve kategorije</Dropdown.Item>
            {categories.map((category) => {
                return <Dropdown.Item key={category.category_id} onSelect={() => onCategoryFilterChange(category)}>{category.category_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);

        let subcategoryFilterDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={productFilter.subcategory_name ? productFilter.subcategory_name : "Sve potkategorije"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_subcategory" onSelect={() => onSubcategoryFilterChange({ subcategory_id: "", subcategory_name: "" })}>Sve potkategorije</Dropdown.Item>
            {subcategories.map((subcategory) => {
                return <Dropdown.Item key={subcategory.subcategory_id} onSelect={() => onSubcategoryFilterChange(subcategory)}>{subcategory.subcategory_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);

        let packagingFilterDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={productFilter.packaging_name ? productFilter.packaging_name : "Sve ambalaže"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_packaging" onSelect={() => onPackagingFilterChange({ packaging_id: "", packaging_name: "" })}>Sve ambalaže</Dropdown.Item>
            {packagings.map((packaging) => {
                return <Dropdown.Item key={packaging.packaging_id} onSelect={() => onPackagingFilterChange(packaging)}>{packaging.packaging_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);
        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                {categoryFilterDropdown}
                {subcategoryFilterDropdown}
                {packagingFilterDropdown}
                <Button className="btn btn-dark" onClick={(e) => { e.preventDefault(); onResetFilterClick() }}>Resetiraj</Button>
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