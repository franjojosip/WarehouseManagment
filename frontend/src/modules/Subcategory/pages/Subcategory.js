import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import SubcategoryViewStore from '../stores/SubcategoryViewStore'
import Table from '../../../common/layouts/Table';
import ModalSubcategory from '../components/ModalSubcategory';
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/Subcategory.css";

@inject(
    i => ({
        viewStore: new SubcategoryViewStore(i.rootStore)
    })
)

@observer
class Subcategory extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, title, clickedSubcategory, onCategoryChange, columns, rows, categories, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onSubcategoryClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.category_name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onSubcategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
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
                                <button type="button" onClick={() => onSubcategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
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
                <ModalSubcategory modalTarget="modalTargetAdd" errorMessage={errorMessage} categories={categories} onSubmit={onCreateClick} name={clickedSubcategory.name} category_name={clickedSubcategory.category_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalSubcategory modalTarget="modalTargetEdit" errorMessage={errorMessage} categories={categories} onSubmit={onEditClick} name={clickedSubcategory.name} category_name={clickedSubcategory.category_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalSubcategory modalTarget="modalTargetDelete" errorMessage={errorMessage} categories={categories} onSubmit={onDeleteClick} name={clickedSubcategory.name} category_name={clickedSubcategory.category_name} onNameChange={onNameChange} onCategoryChange={onCategoryChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onSubcategoryClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Subcategory;