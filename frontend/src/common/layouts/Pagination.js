import React from "react";

export default function Pagination({ previousEnabled, page, totalPages, onPageClick, nextEnabled, onPreviousPageClick, onNextPageClick }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={previousEnabled ? "page-item" : "page-item disabled"}>
                    <a className="page-link" onClick={() => onPreviousPageClick(page)}>Prethodna</a>
                </li>
                <li className="page-item" key={totalPages}>
                    <a disabled="disabled" className="page-link">{page}/{totalPages < 1 ? 1 : totalPages}</a>
                </li>
                <li className={nextEnabled ? "page-item" : "page-item disabled"}>
                    <a className="page-link" onClick={() => onNextPageClick(page)}>Sljedeća</a>
                </li>
            </ul>
        </nav>
    );
}