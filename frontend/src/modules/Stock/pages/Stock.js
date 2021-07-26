import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import StockViewStore from '../stores/StockViewStore'
import CollapsibleTable from '../../../common/layouts/CollapsibleTable';
import ModalStock from '../components/ModalStock';
import Loading from '../../../common/layouts/Loading';
import Button from "react-bootstrap/Button";
import { ToastContainer } from 'react-toastify';

import "../styles/Stock.css";

@inject(
    i => ({
        viewStore: new StockViewStore(i.rootStore)
    })
)

@observer
class Stock extends React.Component {
    render() {

        const { products, errorMessage, cities, filteredWarehouses, filteredLocations, clickedStock, onClickedRow, onClickedNestedRow, parentColumns, childColumns, nestedChildColumns, paginatedData, onStockClicked, onWarehouseChange, onProductChange, onCityChange, onLocationChange, onMinimumQuantityChange, onQuantityChange, isLoaderVisible, title, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableParentColumns = parentColumns.map((element, i) => {
            return <th key={"parentColumn" + i} className="text-center">{element}</th>
        });
        let tableChildColumns = childColumns.map((element, i) => {
            return <td key={"childColumn" + i} className="text-center">{element}</td>
        });
        let tableNestedChildColumns = nestedChildColumns.map((element, i) => {
            return <td key={"nestedChildColumn" + i} className="text-center">{element}</td>
        });

        let tableNestedRows = (<tbody>
            <tr>
                <td className="pt-3-half"></td>
                <td>Nema podataka</td>
                <td className="pt-3-half"></td>
                <td className="pt-3-half"></td>
            </tr>
        </tbody>);

        if (paginatedData.length > 0) {
            tableNestedRows = paginatedData.map((element, i) => {
                let parentRow = element.data.find(item => item.warehouse_id.toString() === element.name.toString());

                let parentIndex = i;
                return (
                    <tbody key={"tbody" + i}>
                        <tr key={i} onClick={() => onClickedRow(parentIndex)} className="accordion-toggle collapsed" style={{ backgroundColor: "#F2F2F2" }} id="accordion1" data-toggle="collapse" data-parent="#accordion1" data-target={"#row" + parentIndex}>
                            <td><Button style={{ margin: 0, padding: 8 }}>Prikaži kategorije</Button></td>
                            <td className="pt-3-half">{parentRow.warehouse_name}</td>
                            <td className="pt-3-half">{parentRow.location_name}</td>
                            <td className="pt-3-half">{parentRow.city_name}</td>
                        </tr>
                        <tr>
                            <td colSpan="12" className="hiddenRow">
                                <div className="collapse" id={"row" + i}>
                                    <table className="table table-bordered table-responsive-md table-striped text-center mb-0">
                                        <thead>
                                            <tr className="info">
                                                <th>Prikaz proizvoda</th>
                                                {tableChildColumns}
                                            </tr>
                                        </thead>
                                        {
                                            element.grouppedCategoryData.map((categoryData, nestedKey) => {
                                                let categoryRow = categoryData.data.find(item => item.category_id.toString() === categoryData.name.toString());
                                                return (
                                                    <tbody key={"nestedBody-" + nestedKey + "-" + parentRow.id}>
                                                        <tr key={"nestedKey-" + parentRow.id} onClick={() => onClickedNestedRow(parentRow.id)} className="accordion-toggle collapsed" style={{ backgroundColor: "#F2F2F2" }} id="accordion1" data-toggle="collapse" data-parent="#accordion1" data-target={"#nestedrow-" + nestedKey + "-" + parentRow.id}>
                                                            <td><Button style={{ margin: 0, padding: 8 }}>Prikaži proizvode</Button></td>
                                                            <td>{categoryRow.category_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="12" className="hiddenNestedRow">
                                                                <div className="collapse" id={"nestedrow-" + nestedKey + "-" + parentRow.id}>
                                                                    <table className="table table-bordered table-responsive-md table-striped text-center mb-0">
                                                                        <thead>
                                                                            <tr className="info">
                                                                                {tableNestedChildColumns}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {categoryData.data.map((product, i) => {
                                                                                return (
                                                                                    <tr key={"categoryData" + i + "-" + parentRow.id}>
                                                                                        <td>{product.product_name}</td>
                                                                                        <td>{product.subcategory_name}</td>
                                                                                        <td>{product.packaging_name}</td>
                                                                                        <td>{product.quantity}</td>
                                                                                        <td>{product.min_quantity}</td>
                                                                                        <td>
                                                                                            <span className="table-remove">
                                                                                                <button type="button" onClick={() => onStockClicked(categoryData, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                                                                                    Izmijeni
                                                                                                </button>
                                                                                            </span></td>
                                                                                        <td>
                                                                                            <span className="table-remove">
                                                                                                <button type="button" onClick={() => onStockClicked(categoryData, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                                                                                    Obriši
                                                                                                </button>
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                );
                                            })
                                        }
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody >
                );
            })
        }

        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalStock modalTarget="modalTargetAdd" errorMessage={errorMessage} warehouses={filteredWarehouses} locations={filteredLocations} cities={cities} products={products} onSubmit={onCreateClick} warehouse_name={clickedStock.warehouse_name} product_name={clickedStock.product_name} location_name={clickedStock.location_name} city_name={clickedStock.city_name} quantity={clickedStock.quantity} min_quantity={clickedStock.min_quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onMinimumQuantityChange={onMinimumQuantityChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalStock modalTarget="modalTargetEdit" errorMessage={errorMessage} warehouses={filteredWarehouses} locations={filteredLocations} cities={cities} products={products} onSubmit={onEditClick} warehouse_name={clickedStock.warehouse_name} product_name={clickedStock.product_name} location_name={clickedStock.location_name} city_name={clickedStock.city_name} quantity={clickedStock.quantity} min_quantity={clickedStock.min_quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onMinimumQuantityChange={onMinimumQuantityChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalStock modalTarget="modalTargetDelete" errorMessage={errorMessage} warehouses={filteredWarehouses} locations={filteredLocations} cities={cities} products={products} onSubmit={onDeleteClick} warehouse_name={clickedStock.warehouse_name} product_name={clickedStock.product_name} location_name={clickedStock.location_name} city_name={clickedStock.city_name} quantity={clickedStock.quantity} min_quantity={clickedStock.min_quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onCityChange={onCityChange} onLocationChange={onLocationChange} onMinimumQuantityChange={onMinimumQuantityChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ToastContainer style={{ fontSize: 15 }} />
                <CollapsibleTable title={title} tableNestedRows={tableNestedRows} tableParentColumns={tableParentColumns} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onStockClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout >
        );
    }
}

export default Stock;