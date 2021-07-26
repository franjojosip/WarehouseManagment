import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import EntryViewStore from '../stores/EntryViewStore'
import CollapsibleTable from '../../../common/layouts/CollapsibleTable';
import ModalEntry from '../components/ModalEntry';
import ModalEntrySubmit from '../components/ModalEntrySubmit';
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';
import Button from "react-bootstrap/Button";

import "../styles/Entry.css";

@inject(
    i => ({
        viewStore: new EntryViewStore(i.rootStore)
    })
)

@observer
class Entry extends React.Component {
    render() {
        const { errorMessage, cities, filteredLocations, filteredWarehouses, products, onSubmitClick, clickedEntry, onClickedRow, parentColumns, childColumns, paginatedData, onEntryClicked, onWarehouseChange, onCityChange, onLocationChange, onProductChange, onPackagingChange, onQuantityChange, isLoaderVisible, title, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

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

                let nestedIndex = i;
                return (
                    <tbody key={"tbody" + element.name}>
                        <tr key={element.name} onClick={() => onClickedRow(nestedIndex)} className="accordion-toggle collapsed" style={{ backgroundColor: "#F2F2F2" }} id="accordion1" data-toggle="collapse" data-parent="#accordion1" data-target={"#row" + nestedIndex}>
                            <td><Button style={{ margin: 0, padding: 8 }}>Prikaži proizvode</Button></td>
                            <td className="pt-3-half">{parentRow[0]}</td>
                            <td className="pt-3-half">{element.data[0].city_name}</td>
                            <td className="pt-3-half">{element.data[0].location_name}</td>
                            <td className="pt-3-half">{parentRow[1].substring(0, 10)}</td>
                        </tr>
                        <tr key={"hidden" + element.name}>
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
                                                                    item.isSubmited ?
                                                                        null
                                                                        :
                                                                        <span className="table-edit">
                                                                            <button type="button" onClick={() => onEntryClicked(item, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                                                                Izmijeni
                                                                            </button>
                                                                        </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.isSubmited ?
                                                                        null
                                                                        :
                                                                        <span className="table-remove">
                                                                            <button type="button" onClick={() => onEntryClicked(item, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                                                                Obriši
                                                                            </button>
                                                                        </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.isSubmited ?
                                                                        "POTVRĐENO"
                                                                        :
                                                                        <span className="table-submit">
                                                                            <button type="button" onClick={() => onEntryClicked(item, false)} data-toggle="modal" data-target="#modalTargetSubmit" className="btn btn-info btn-rounded btn-sm my-0">
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

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalEntry modalTarget="modalTargetAdd" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onCreateClick} warehouse_name={clickedEntry.warehouse_name} city_name={clickedEntry.city_name} location_name={clickedEntry.location_name} category_name={clickedEntry.category_name} subcategory_name={clickedEntry.subcategory_name} product_name={clickedEntry.product_name} subcategory_name={clickedEntry.subcategory_name} packaging_name={clickedEntry.packaging_name} quantity={clickedEntry.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalEntry modalTarget="modalTargetEdit" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onEditClick} warehouse_name={clickedEntry.warehouse_name} city_name={clickedEntry.city_name} location_name={clickedEntry.location_name} category_name={clickedEntry.category_name} subcategory_name={clickedEntry.subcategory_name} product_name={clickedEntry.product_name} subcategory_name={clickedEntry.subcategory_name} packaging_name={clickedEntry.packaging_name} quantity={clickedEntry.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalEntry modalTarget="modalTargetDelete" errorMessage={errorMessage} warehouses={filteredWarehouses} cities={cities} locations={filteredLocations} products={products} onSubmit={onDeleteClick} warehouse_name={clickedEntry.warehouse_name} city_name={clickedEntry.city_name} location_name={clickedEntry.location_name} category_name={clickedEntry.category_name} subcategory_name={clickedEntry.subcategory_name} product_name={clickedEntry.product_name} subcategory_name={clickedEntry.subcategory_name} packaging_name={clickedEntry.packaging_name} quantity={clickedEntry.quantity} onWarehouseChange={onWarehouseChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onProductChange={onProductChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalEntrySubmit onSubmit={onSubmitClick} />
                <ToastContainer style={{ fontSize: 15 }} />
                <CollapsibleTable title={title} tableNestedRows={tableNestedRows} tableParentColumns={tableParentColumns} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onEntryClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        );
    }
}

export default Entry;