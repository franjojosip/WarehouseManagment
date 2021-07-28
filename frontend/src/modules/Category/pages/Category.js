import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import CategoryViewStore from '../stores/CategoryViewStore'
import Table from '../../../common/layouts/Table';
import ModalCategory from '../components/ModalCategory';
import { ToastContainer } from 'react-toastify';

import "../styles/Category.css";

@inject(
    i => ({
        viewStore: new CategoryViewStore(i.rootStore)
    })
)

@observer
class Category extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, title, clickedCategory, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onCategoryClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onCategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
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
                                <button type="button" onClick={() => onCategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
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
            <Layout isLoaderVisible={isLoaderVisible}>
                <ModalCategory modalTarget="modalTargetAdd" errorMessage={errorMessage} onSubmit={onCreateClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalCategory modalTarget="modalTargetEdit" errorMessage={errorMessage} onSubmit={onEditClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalCategory modalTarget="modalTargetDelete" errorMessage={errorMessage} onSubmit={onDeleteClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onCategoryClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Category;