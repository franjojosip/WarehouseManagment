import React from 'react';
import Pagination from './Pagination';

import "./styles/Table.css";

export default function Table({ title, filterRow, hideAddButton, columns, tableRows, page, pageSize, totalPages, previousEnabled, nextEnabled, onActionClicked, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick }) {

  return (
    <div className="card mt-5 mb-5 basicCard">
      <div className="card-body">
        <h1 className="text-center font-weight-bold py-4">
          {title}
        </h1>
        {
          hideAddButton != null ?
            null
            :
            <div className="row" style={{ float: 'right' }}>
              <a className="text-success"><i className="fas fa-plus fa-2x" aria-hidden="true" data-toggle="modal" data-target="#modalTargetAdd" onClick={() => onActionClicked(null, true)}></i></a>
            </div>
        }
        <br />
        {
          filterRow ?
            filterRow :
            <div className="row">
              <div className="dropdown mb-3 col-md-3 filterColumn">
                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuPageSize" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {pageSize}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuPageSize">
                  <button className="dropdown-item" onClick={() => onChangePageSize(5)} type="button">5</button>
                  <button className="dropdown-item" onClick={() => onChangePageSize(10)} type="button">10</button>
                  <button className="dropdown-item" onClick={() => onChangePageSize(15)} type="button">15</button>
                </div>
              </div>
            </div>
        }
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                {columns.map((element, i) => {
                  return <th key={i} className="text-center cellHeader" style={{ fontWeight: "bold" }}>{element}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination totalPages={totalPages} page={page} previousEnabled={previousEnabled} onPageClick={onPageClick} nextEnabled={nextEnabled} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />

    </div >
  );
}