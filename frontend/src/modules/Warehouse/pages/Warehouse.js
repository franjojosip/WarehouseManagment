import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import WarehouseViewStore from '../stores/WarehouseViewStore'
import Table from '../../../common/layouts/Table';
import ModalWarehouse from '../components/ModalWarehouse';
import { ToastContainer } from 'react-toastify';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../styles/Warehouse.css";

@inject(
    i => ({
        viewStore: new WarehouseViewStore(i.rootStore)
    })
)

@observer
class Warehouse extends React.Component {
    render() {
        const { cityFilter, onCityFilterChange, onResetFilterClick, isLoaderVisible, onMultiSelect, errorMessage, title, users, clickedWarehouse, onLocationChange, columns, rows, filteredLocations, cities, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onCityChange, onNameChange, onWarehouseClicked, onUserSelect, onUserRemove, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.name}</td>
                <td className="pt-3-half">{element.location_name}</td>
                <td className="pt-3-half">{element.city_name}</td>
                <td className="pt-3-half">{element.users ? element.users.map((user) => user.name).join(", ") : null}</td>
                <td>
                    {element.id != "" ?
                        <span className="table-edit">
                            <button type="button" onClick={() => onWarehouseClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                Edit
                            </button>
                        </span>
                        :
                        null
                    }
                </td>
                <td>
                    {element.id != "" ?
                        <span className="table-remove">
                            <button type="button" onClick={() => onWarehouseClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                Obriši
                            </button>
                        </span>
                        :
                        null
                    }
                </td>
            </tr>);
        });
        let cityFilterDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={cityFilter.name ? cityFilter.name : "Svi gradovi"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_city" onSelect={() => onCityFilterChange({city_id:"",city_name:"F"})}>Svi gradovi</Dropdown.Item>
            {cities.map((city) => {
                return <Dropdown.Item key={city.city_id} onSelect={() => onCityFilterChange(city)}>{city.city_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);


        let selectedUsers = clickedWarehouse.users ? clickedWarehouse.users.map((user) => { return { name: user.name, id: user.id } }) : [];
        let mappedUsers = users ? users.map(user => { return { id: user.id, name: user.name } }) : [];

        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                {cityFilterDropdown}
                <Button className="btn btn-dark" onClick={(e) => { e.preventDefault(); onResetFilterClick() }}>Resetiraj</Button>

                <ModalWarehouse modalTarget="modalTargetAdd" onMultiSelect={onMultiSelect} errorMessage={errorMessage} users={mappedUsers} selectedUsers={selectedUsers} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onCreateClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalWarehouse modalTarget="modalTargetEdit" onMultiSelect={onMultiSelect} errorMessage={errorMessage} users={mappedUsers} selectedUsers={selectedUsers} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onEditClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalWarehouse modalTarget="modalTargetDelete" onMultiSelect={onMultiSelect} errorMessage={errorMessage} users={mappedUsers} selectedUsers={selectedUsers} locations={filteredLocations} cities={cities} onSelect={onUserSelect} onRemove={onUserRemove} onSubmit={onDeleteClick} name={clickedWarehouse.name} city_name={clickedWarehouse.city_name} location_name={clickedWarehouse.location_name} onNameChange={onNameChange} onCityChange={onCityChange} onLocationChange={onLocationChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onWarehouseClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Warehouse;