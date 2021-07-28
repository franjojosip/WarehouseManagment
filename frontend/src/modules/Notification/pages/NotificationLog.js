import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import NotificationViewStore from '../stores/NotificationViewStore'
import Table from '../../../common/layouts/Table';
import ModalNotificationLog from '../components/ModalNotificationLog';

import "../styles/Notification.css";
import { Button } from 'react-bootstrap';

@inject(
    i => ({
        viewStore: new NotificationViewStore(i.rootStore)
    })
)

@observer
class Notification extends React.Component {
    render() {
        const { isLoaderVisible, title, clickedNotification, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onZipCodeChange, onNotificationClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.notification_name}</td>
                <td className="pt-3-half">{element.notification_type}</td>
                <td className="pt-3-half">{element.email}</td>
                <td className="pt-3-half">{element.date_created}</td>
                <td className="pt-3-half">
                    <span className="table-show">
                        <button type="button" onClick={() => onNotificationClicked(element)} data-toggle="modal" data-target="#modalTargetShow" className="btn btn-info btn-rounded btn-sm my-0">
                            Detalji
                        </button>
                    </span></td>
            </tr>);
        });
        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                <ModalNotificationLog modalTarget={"modalTargetShow"} notification_name={clickedNotification.notification_name} notification_type={clickedNotification.notification_type} notification_products={clickedNotification.products} email={clickedNotification.email} date_created={clickedNotification.date_created} />
                <Table title={title} hideAddButton={true} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onNotificationClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout >
        )
    }
}

export default Notification;