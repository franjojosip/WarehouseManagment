import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import LocationViewStore from '../stores/LocationViewStore'
import Table from '../../../common/layouts/Table';
import ModalLocation from '../components/ModalLocation';
import { ToastContainer } from 'react-toastify';

import "../styles/Location.css";

@inject(
    i => ({
        viewStore: new LocationViewStore(i.rootStore)
    })
)

@observer
class Location extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, cities, title, clickedLocation, onCityChange, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onNameChange, onLocationClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.city_name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onLocationClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
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
                                <button type="button" onClick={() => onLocationClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
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
                <ModalLocation modalTarget="modalTargetAdd" errorMessage={errorMessage} cities={cities} onSubmit={onCreateClick} name={clickedLocation.name} city_name={clickedLocation.city_name} onNameChange={onNameChange} onCityChange={onCityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalLocation modalTarget="modalTargetEdit" errorMessage={errorMessage} cities={cities} onSubmit={onEditClick} name={clickedLocation.name} city_name={clickedLocation.city_name} onNameChange={onNameChange} onCityChange={onCityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalLocation modalTarget="modalTargetDelete" errorMessage={errorMessage} cities={cities} onSubmit={onDeleteClick} name={clickedLocation.name} city_name={clickedLocation.city_name} onNameChange={onNameChange} onCityChange={onCityChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onLocationClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Location;