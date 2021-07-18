import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import CategoryViewStore from '../stores/CategoryViewStore'
import Table from '../../../common/layouts/Table';
import ModalCategory from '../components/ModalCategory';
import Loading from '../../../common/layouts/Loading';

import "../styles/Category.css";

@inject(
    i => ({
        viewStore: new CategoryViewStore(i.rootStore)
    })
)

@observer
class Category extends React.Component {
    render() {
        const { isLoaderVisible, title, clickedCategory, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onCategoryClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td>
                    <span className="table-edit">
                        <button type="button" onClick={() => onCategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                            Edit
                        </button>
                    </span>
                </td>
                <td>
                    <span className="table-remove">
                        <button type="button" onClick={() => onCategoryClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                            Obriši
                        </button>
                    </span>
                </td>
            </tr>);
        });

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalCategory modalTarget="modalTargetAdd" onSubmit={onCreateClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled}/>
                <ModalCategory modalTarget="modalTargetEdit" onSubmit={onEditClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled}/>
                <ModalCategory modalTarget="modalTargetDelete" onSubmit={onDeleteClick} name={clickedCategory.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled}/>
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onCategoryClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        )
    }
}

export default Category;