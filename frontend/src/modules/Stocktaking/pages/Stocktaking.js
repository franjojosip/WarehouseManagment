import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import StocktakingViewStore from '../stores/StocktakingViewStore'
import CollapsibleTable from '../../../common/layouts/CollapsibleTable';
import ModalStocktaking from '../components/ModalStocktaking';
import Loading from '../../../common/layouts/Loading';

import "../styles/Stocktaking.css";

@inject(
    i => ({
        viewStore: new StocktakingViewStore(i.rootStore)
    })
)

@observer
class Stocktaking extends React.Component {
    render() {

        const { warehouses, products, packagings, clickedRows, clickedStocktaking, onClickedRow, parentColumns, childColumns, paginatedData, onStocktakingClicked, onWarehouseChange, onProductChange, onPackagingChange, onQuantityChange, isLoaderVisible, title, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableParentColumns = parentColumns.map((element, i) => {
            return <th key={"parentColumn" + i} className="text-center">{element}</th>
        });
        let tableChildColumns = childColumns.map((element, i) => {
            return <td key={"childColumn" + i} className="text-center">{element}</td>
        });

        let tableNestedRows = (<tr>
            <td>Nema podataka</td>
            <td className="pt-3-half"></td>
            <td className="pt-3-half"></td>
        </tr>);

        if (paginatedData.length > 0) {
            tableNestedRows = paginatedData.map((element, i) => {
                let parentRow = element.name.split("-");
                parentRow[0] = element.data.find(item => item.warehouse_id.toString() === parentRow[0]).warehouse_name;
                parentRow[1] = element.data.find(item => item.user_id.toString() === parentRow[1]).user_name;

                let nestedIndex = i;

                return (
                    <tbody key={"tbody" + i}>
                        <tr key={i} onClick={() => onClickedRow(nestedIndex)} className="accordion-toggle collapsed" style={{ backgroundColor: "#F2F2F2" }} id="accordion1" data-toggle="collapse" data-parent="#accordion1" data-target={"#row" + nestedIndex}>
                            <td><i className={clickedRows.includes(nestedIndex) ? "fas fa-arrow-down fa-lg" : "fas fa-arrow-right fa-lg"}></i></td>
                            <td className="pt-3-half">{parentRow[0]}</td>
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
                                                            <td>{item.packaging_name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>
                                                                <span className="table-remove">
                                                                    <button type="button" onClick={() => onStocktakingClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                                                        Izmijeni
                                                                    </button>
                                                                </span></td>
                                                            <td>
                                                                <span className="table-remove">
                                                                    <button type="button" onClick={() => onStocktakingClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                                                        Obriši
                                                                    </button>
                                                                </span>
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
                <ModalStocktaking modalTarget="modalTargetAdd" warehouses={warehouses} products={products} packagings={packagings} onSubmit={onCreateClick} warehouse_name={clickedStocktaking.warehouse_name} product_name={clickedStocktaking.product_name} packaging_name={clickedStocktaking.packaging_name} quantity={clickedStocktaking.quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onPackagingChange={onPackagingChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalStocktaking modalTarget="modalTargetEdit" warehouses={warehouses} products={products} packagings={packagings} onSubmit={onEditClick} warehouse_name={clickedStocktaking.warehouse_name} product_name={clickedStocktaking.product_name} packaging_name={clickedStocktaking.packaging_name} quantity={clickedStocktaking.quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onPackagingChange={onPackagingChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalStocktaking modalTarget="modalTargetDelete" warehouses={warehouses} products={products} packagings={packagings} onSubmit={onDeleteClick} warehouse_name={clickedStocktaking.warehouse_name} product_name={clickedStocktaking.product_name} packaging_name={clickedStocktaking.packaging_name} quantity={clickedStocktaking.quantity} onWarehouseChange={onWarehouseChange} onProductChange={onProductChange} onPackagingChange={onPackagingChange} onQuantityChange={onQuantityChange} isSubmitDisabled={isSubmitDisabled} />
                <CollapsibleTable title={title} tableNestedRows={tableNestedRows} tableParentColumns={tableParentColumns} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onStocktakingClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        );
    }
}

export default Stocktaking;