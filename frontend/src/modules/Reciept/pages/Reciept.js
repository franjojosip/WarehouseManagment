import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import RecieptViewStore from '../stores/RecieptViewStore'
import CollapsibleTable from '../../../common/layouts/CollapsibleTable';
import ModalReciept from '../components/ModalReciept';
import ModalRecieptSubmit from '../components/ModalRecieptSubmit';
import { ToastContainer } from 'react-toastify';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "../styles/Reciept.css";

@inject(
    i => ({
        viewStore: new RecieptViewStore(i.rootStore),
        rootStore: i.rootStore
    })
)
@observer
class Reciept extends React.Component {
    render() {
        const { errorMessage, onGeneratePdfClick, dateFilter, cityFilter, onCityFilterChange, onStartDateFilterChange, onEndDateFilterChange, onResetFilterClick, cities, filteredLocations, filteredWarehouses, products, onSubmitClick, clickedReciept, onClickedRow, parentColumns, childColumns, paginatedData, onRecieptClicked, onWarehouseChange, onCityChange, onLocationChange, onProductChange, onQuantityChange, isLoaderVisible, title, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableParentColumns = parentColumns.map((element, i) => {
            return <th key={"parentColumn" + i} className="text-center">{element}</th>
        });
        let tableChildColumns = childColumns.map((element, i) => {
            return <td key={"childColumn" + i} className="text-center">{element}</td>
        });

        let tableNestedRows = (<tbody>
            <tr key="tableNestedRows">
                <td>Nema podataka</td>
                <td className="pt-3-half"></td>
                <td className="pt-3-half"></td>
                <td className="pt-3-half"></td>
                <td className="pt-3-half"></td>
            </tr>
        </tbody>);

        if (paginatedData.length > 0) {
            tableNestedRows = paginatedData.map((element, i) => {
                let parentRow = element.name.split("-");
                parentRow[0] = element.data.find(item => item.warehouse_id.toString() === parentRow[0]).warehouse_name;
                parentRow[1] = element.data.find(item => item.user_id.toString() === parentRow[1]).user_name;

                let nestedIndex = i;

                return (
                    <tbody key={"tbody" + i}>
                        <tr key={i} onClick={() => onClickedRow(nestedIndex)} className="accordion-toggle collapsed" style={{ backgroundColor: "#F2F2F2" }} id="accordion1" data-toggle="collapse" data-parent="#accordion1" data-target={"#row" + nestedIndex}>
                            <td><Button style={{ margin: 0, padding: 8 }}>Prikaži proizvode</Button></td>
                            <td className="pt-3-half">{parentRow[0]}</td>
                            <td className="pt-3-half">{parentRow[1]}</td>
                            <td className="pt-3-half">{element.data[0].city_name}</td>
                            <td className="pt-3-half">{parentRow[2]}</td>
                        </tr>
                        <tr>
                            <td colSpan="12" className="hiddenRow">
                                <div className="collapse" id={"row" + i}>
                                    <table className="table table-bordered table-responsive-md table-striped text-center mb-0">
                                        <thead>
                                            <tr className="info">
                                                {tableChildColumns}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                element.data.map((item, i) => {
                                                    return (
                                                        <tr key={"element_data" + i}>
                                                            <td>{item.product_name}</td>
                                                            <td>{item.category_name}</td>
                                                            <td>{item.subcategory_name}</td>
                                                            <td>{item.packaging_name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>
                                                                {
                                                                    item.isSubmitted ?
                                                                        null
                                                                        :
                                                                        <span className="table-edit">
                                                                            <button type="button" onClick={() => onRecieptClicked(item, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                                                                Izmijeni
                                                                            </button>
                                                                        </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.isSubmitted ?
                                                                        null
                                                                        :
                                                                        <span className="table-remove">
                                                                            <button type="button" onClick={() => onRecieptClicked(item, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                                                                Obriši
                                                                            </button>
                                                                        </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.isSubmitted ?
                                                                        <i className="fa fa-fw fa-check" style={{ fontSize: '1.4em' }} />
                                                                        :
                                                                        <span className="table-submit">
                                                                            <button type="button" onClick={() => onRecieptClicked(item, false)} data-toggle="modal" data-target="#modalTargetSubmit" className="btn btn-info btn-rounded btn-sm my-0">
                                                                                Potvrdi
                                                                            </button>
                                                                        </span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                );
            })
        }
        let classes = makeStyles((theme) => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 200,
            },
        }));

        let cityFilterDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={cityFilter.city_name ? cityFilter.city_name : "Svi gradovi"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_city" onSelect={() => onCityFilterChange({ city_id: "", city_name: "" })}>Svi gradovi</Dropdown.Item>
            {cities.map((city) => {
                return <Dropdown.Item key={city.city_id} onSelect={() => onCityFilterChange(city)}>{city.city_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);


        let filterRow = (<div className="row" style={{ alignItems: "center" }}>
            <div className="col-3">{cityFilterDropdown}</div>
            <div className="col-3">
                <TextField
                    id="startDate"
                    type="date"
                    format="DD/MM/yyyy"
                    value={dateFilter.startDate}
                    className={classes.textField}
                    onChange={(e) => onStartDateFilterChange(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="col-3">
                <TextField
                    id="endDate"
                    type="date"
                    format="DD/MM/yyyy"
                    value={dateFilter.endDate}
                    className={classes.textField}
                    onChange={onEndDateFilterChange}
                    onChange={(e) => onEndDateFilterChange(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="col-3"><Button className="btn btn-dark" onClick={(e) => { e.preventDefault(); onResetFilterClick() }}>Resetiraj</Button></div>

            <button
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); onGeneratePdfClick() }}
            >
                GENERIRAJ IZVJEŠĆE
            </button>
        </div >);

        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                <ModalReciept modalTarget="modalTargetAdd" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onCreateClick} warehouse_name={clickedReciept.warehouse_name} city_name={clickedReciept.city_name} location_name={clickedReciept.location_name} category_name={clickedReciept.category_name} subcategory_name={clickedReciept.subcategory_name} product_name={clickedReciept.product_name} packaging_name={clickedReciept.packaging_name} quantity={clickedReciept.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalReciept modalTarget="modalTargetEdit" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onEditClick} warehouse_name={clickedReciept.warehouse_name} city_name={clickedReciept.city_name} location_name={clickedReciept.location_name} category_name={clickedReciept.category_name} subcategory_name={clickedReciept.subcategory_name} product_name={clickedReciept.product_name} packaging_name={clickedReciept.packaging_name} quantity={clickedReciept.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalReciept modalTarget="modalTargetDelete" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onDeleteClick} warehouse_name={clickedReciept.warehouse_name} city_name={clickedReciept.city_name} location_name={clickedReciept.location_name} category_name={clickedReciept.category_name} subcategory_name={clickedReciept.subcategory_name} product_name={clickedReciept.product_name} packaging_name={clickedReciept.packaging_name} quantity={clickedReciept.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalRecieptSubmit onSubmit={onSubmitClick} />
                <ToastContainer style={{ fontSize: 15 }} />
                <CollapsibleTable filterRow={filterRow} isAdmin={true} title={title} tableNestedRows={tableNestedRows} tableParentColumns={tableParentColumns} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onRecieptClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        );
    }
}

export default Reciept;