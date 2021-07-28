import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import CityViewStore from '../stores/CityViewStore'
import Table from '../../../common/layouts/Table';
import ModalCity from '../components/ModalCity';
import { ToastContainer } from 'react-toastify';

import "../styles/City.css";

@inject(
    i => ({
        viewStore: new CityViewStore(i.rootStore)
    })
)

@observer
class City extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, title, clickedCity, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onZipCodeChange, onCityClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.zip_code}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onCityClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
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
                                <button type="button" onClick={() => onCityClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
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
                <ModalCity modalTarget="modalTargetAdd" onSubmit={onCreateClick} errorMessage={errorMessage} name={clickedCity.name} zip_code={clickedCity.zip_code} onNameChange={onNameChange} onZipCodeChange={onZipCodeChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalCity modalTarget="modalTargetEdit" onSubmit={onEditClick} errorMessage={errorMessage} name={clickedCity.name} zip_code={clickedCity.zip_code} onNameChange={onNameChange} onZipCodeChange={onZipCodeChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalCity modalTarget="modalTargetDelete" onSubmit={onDeleteClick} errorMessage={errorMessage} name={clickedCity.name} zip_code={clickedCity.zip_code} onNameChange={onNameChange} onZipCodeChange={onZipCodeChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onCityClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout >
        )
    }
}

export default City;