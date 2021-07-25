import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import PackagingViewStore from '../stores/PackagingViewStore'
import Table from '../../../common/layouts/Table';
import ModalPackaging from '../components/ModalPackaging';
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/Packaging.css";

@inject(
    i => ({
        viewStore: new PackagingViewStore(i.rootStore)
    })
)

@observer
class Packaging extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, title, clickedPackaging, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onPackagingClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onPackagingClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                    Edit
                                </button>
                            </span>
                            : null
                    }
                </td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-remove">
                                <button type="button" onClick={() => onPackagingClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                    Obriši
                                </button>
                            </span>
                            : null
                    }
                </td>
            </tr>);
        });

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalPackaging modalTarget="modalTargetAdd" onSubmit={onCreateClick} errorMessage={errorMessage} name={clickedPackaging.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalPackaging modalTarget="modalTargetEdit" onSubmit={onEditClick} errorMessage={errorMessage} name={clickedPackaging.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalPackaging modalTarget="modalTargetDelete" onSubmit={onDeleteClick} errorMessage={errorMessage} name={clickedPackaging.name} onNameChange={onNameChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onPackagingClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Packaging;