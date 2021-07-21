import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import WarehouseViewStore from '../stores/WarehouseViewStore'
import Table from '../../../common/layouts/Table';
import ModalWarehouse from '../components/ModalWarehouse';
import Loading from '../../../common/layouts/Loading';

import "../styles/Warehouse.css";

@inject(
    i => ({
        viewStore: new WarehouseViewStore(i.rootStore)
    })
)

@observer
class Warehouse extends React.Component {
    render() {
        const { isLoaderVisible, title, users, clickedWarehouse, onLocationChange, columns, rows, filteredLocations, cities, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onCityChange, onNameChange, onWarehouseClicked, onUserSelect, onUserRemove, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.location_name}</td>
                <td className="pt-3-half">{element.users.map((user) => user.name).join(", ")}</td>
                <td>
                    <span className="table-edit">
                        <button type="button" onClick={() => onWarehouseClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                            Edit
                        </button>
                    </span>
                </td>
                <td>
                    <span className="table-remove">
                        <button type="button" onClick={() => onWarehouseClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                            Obriši
                        </button>
                    </span>
                </td>
            </tr>);
        });

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalWarehouse modalTarget="modalTargetAdd" users={users} selectedUsers={clickedWarehouse.users} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onCreateClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalWarehouse modalTarget="modalTargetEdit" users={users} selectedUsers={clickedWarehouse.users} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onEditClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalWarehouse modalTarget="modalTargetDelete" users={users} selectedUsers={clickedWarehouse.users} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onDeleteClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onWarehouseClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        )
    }
}

export default Warehouse;