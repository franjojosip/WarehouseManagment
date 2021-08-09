import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/components/Layout"
import NotificationViewStore from '../stores/NotificationViewStore'
import Table from '../../../common/components/Table/Table';
import ModalNotificationLog from '../components/ModalNotificationLog';
import ModalNotificationLogShow from '../components/ModalNotificationLogShow';
import { ToastContainer } from 'react-toastify';
import moment from "moment";

import "../styles/Notification.css";
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

@inject(
    i => ({
        viewStore: new NotificationViewStore(i.rootStore)
    })
)

@observer
class Notification extends React.Component {
    render() {
        const { isLoaderVisible, types, notificationTypeFilter, onNotificationTypeFilterChange, onResetFilterClick, title, clickedNotificationLog, onNotificationClicked, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, onPageClick, onChangePageSize, onPreviousPageClick, onNextPageClick, onDeleteClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.subject}</td>
                <td className="pt-3-half">{element.notification_type_name}</td>
                <td className="pt-3-half">{element.email}</td>
                <td className="pt-3-half">{element.data.substring(0, 20) + "..."}</td>
                <td className="pt-3-half">{element.date_created ? moment(element.date_created).format("DD/MM/YYYY HH:mm") : null}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-remove">
                                <button type="button" onClick={() => onNotificationClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                    Obriši
                                </button>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-success">
                                <button type="button" onClick={() => onNotificationClicked(element, false)} data-toggle="modal" data-target="#modalTargetShow" className="btn btn-info btn-rounded btn-sm my-0">
                                    Prikaži
                                </button>
                            </span>
                            :
                            null
                    }
                </td>
            </tr>);
        });
        let filterRow = (
            <div className="row" style={{ alignItems: "center" }}>
                <div className="col-4">
                    <DropdownButton id="customDropdown" variant="secondary" title={notificationTypeFilter.name ? notificationTypeFilter.name : "Svi tipovi notifikacija"} style={{ marginBottom: 10 }}>
                        <Dropdown.Item key="default_type" onSelect={() => onNotificationTypeFilterChange({ notification_type_id: "", notification_type_name: "" })}>Svi tipovi notifikacija</Dropdown.Item>
                        {types.map((type) => {
                            return <Dropdown.Item key={type.notification_type_id} onSelect={() => onNotificationTypeFilterChange(type)}>{type.notification_type_name}</Dropdown.Item>;
                        })
                        }
                    </DropdownButton>
                </div>
                <div className="col-3">
                    <Button className="btn btn-dark" onClick={(e) => { e.preventDefault(); onResetFilterClick() }}>Resetiraj</Button>
                </div>
            </div>);
        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                <ModalNotificationLog modalTarget="modalTargetDelete" data={clickedNotificationLog.data} email={clickedNotificationLog.email} date_created={clickedNotificationLog.date_created} notification_type_name={clickedNotificationLog.notification_type_name} onSubmit={onDeleteClick} />
                <ModalNotificationLogShow modalTarget="modalTargetShow" data={clickedNotificationLog.data} email={clickedNotificationLog.email} date_created={clickedNotificationLog.date_created} notification_type_name={clickedNotificationLog.notification_type_name} />
                <Table hideAddButton={true} filterRow={filterRow} title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )
    }
}

export default Notification;