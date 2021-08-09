import React from 'react';
import Pagination from './Pagination';

import "./styles/Table.css";

export default function CollapsibleTable({ filterRow, isAdmin, tableParentColumns, tableNestedRows, title, page, pageSize, totalPages, previousEnabled, nextEnabled, onActionClicked, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick }) {
  return (
    <div className="card col-8 mx-auto mt-5 mb-5">
      <div className="card-body">
        <h2 className="text-center font-weight-bold py-4">
          {title}
        </h2>
        <div id="table" className="table">
          <div className="row">
            <div className="col-9">
              <div className="dropdown mb-3">
                <span>Broj podataka po stranici:</span>
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
            <div className="col-3">
              {
                isAdmin ?
                  <span className="table-add float-right mb-3 mt-3 mr-3">
                    <a className="text-success"><i className="fas fa-plus fa-2x" aria-hidden="true" data-toggle="modal" data-target="#modalTargetAdd" onClick={() => onActionClicked(null, true)}></i></a>
                  </span>
                  : null
              }
            </div>
          </div>
          {filterRow ? filterRow : null}
          <table className="table table-bordered table-responsive-md text-center">
            <thead>
              <tr>
                <th></th>
                {tableParentColumns}
              </tr>
            </thead>
            {tableNestedRows}
          </table>
          <Pagination totalPages={totalPages} page={page} previousEnabled={previousEnabled} onPageClick={onPageClick} nextEnabled={nextEnabled} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
        </div>
      </div>
    </div>
  );
}