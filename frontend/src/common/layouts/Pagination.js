import React from "react";

export default function Pagination({ previousEnabled, page,totalPages, onPageClick, nextEnabled, onPreviousPageClick, onNextPageClick }) {

    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      if (i + 1 === page) {
        pages.push(<li key={i} className="page-item active"><a className="page-link">{i + 1}</a></li>)
      }
      else {
        pages.push(<li key={i} className="page-item" onClick={() => onPageClick(i + 1)}><a className="page-link">{i + 1}</a></li>)
      }
    }

    return (<nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            {previousEnabled ?
                <li className="page-item">
                    <a className="page-link" onClick={() => onPreviousPageClick(page)}>Previous</a>
                </li>
                :
                <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                </li>
            }
            {pages}
            {nextEnabled ?
                <li className="page-item">
                    <a className="page-link" onClick={() => onNextPageClick(page)}>Next</a>
                </li>
                :
                <li className="page-item disabled">
                    <a className="page-link">Next</a>
                </li>
            }
        </ul>
    </nav>);
}