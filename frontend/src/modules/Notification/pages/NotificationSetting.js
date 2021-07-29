import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import NotificationSettingViewStore from '../stores/NotificationSettingViewStore'
import Table from '../../../common/layouts/Table';
import ModalNotificationSetting from '../components/ModalNotificationSetting';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../styles/Notification.css";

@inject(
    i => ({
        viewStore: new NotificationSettingViewStore(i.rootStore)
    })
)

@observer
class NotificationSetting extends React.Component {
    render() {
        const { isLoaderVisible, notifcationTypeFilter, onNotificationTypeFilterChange, onResetFilterClick, title, clickedNotificationSetting, notification_types, days, columns, rows, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onDayOfWeekChange, onTimeChange, onNotificationTypeChange, onPageClick, onChangePageSize, onNotificationSettingClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            return (<tr key={i}>
                <td className="pt-3-half">{element.notification_type_name}</td>
                <td className="pt-3-half">{element.day_of_week_name}</td>
                <td className="pt-3-half">{element.time}</td>
                <td className="pt-3-half">{element.email}</td>
                <td>
                    <span className="table-edit">
                        <button type="button" onClick={() => onNotificationSettingClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                            Edit
                        </button>
                    </span>
                </td>
                <td>
                    <span className="table-remove">
                        <button type="button" onClick={() => onNotificationSettingClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                            Obriši
                        </button>
                    </span>
                </td>
            </tr>);
        });
        let notificationTypeDropdown = (<DropdownButton id="customDropdown" variant="secondary" title={notifcationTypeFilter.name ? notifcationTypeFilter.name : "Svi tipovi notifikacije"} style={{ marginBottom: 10 }}>
            <Dropdown.Item key="default_notification_setting" onSelect={() => onNotificationTypeFilterChange({ notification_type_id: "", notification_type_name: "" })}>Svi gradovi</Dropdown.Item>
            {notification_types.map((notification_type) => {
                return <Dropdown.Item key={notification_type.notification_type_id} onSelect={() => onNotificationTypeFilterChange(notification_type)}>{notification_type.notification_type_name}</Dropdown.Item>;
            })
            }
        </DropdownButton>);
        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                {notificationTypeDropdown}
                <Button className="btn btn-dark" onClick={(e) => { e.preventDefault(); onResetFilterClick() }}>Resetiraj</Button>
                <ModalNotificationSetting modalTarget="modalTargetAdd" days={days} notification_types={notification_types} day_of_week_name={clickedNotificationSetting.day_of_week_name} time={clickedNotificationSetting.time} email={clickedNotificationSetting.email} notification_type_name={clickedNotificationSetting.notification_type_name} onDayOfWeekChange={onDayOfWeekChange} onTimeChange={onTimeChange} onNotificationTypeChange={onNotificationTypeChange} onSubmit={onCreateClick} isSubmitDisabled={isSubmitDisabled} />
                <ModalNotificationSetting modalTarget="modalTargetEdit" days={days} notification_types={notification_types} day_of_week_name={clickedNotificationSetting.day_of_week_name} time={clickedNotificationSetting.time} email={clickedNotificationSetting.email} notification_type_name={clickedNotificationSetting.notification_type_name} onDayOfWeekChange={onDayOfWeekChange} onTimeChange={onTimeChange} onNotificationTypeChange={onNotificationTypeChange} onSubmit={onEditClick} isSubmitDisabled={isSubmitDisabled} />
                <ModalNotificationSetting modalTarget="modalTargetDelete" days={days} notification_types={notification_types} day_of_week_name={clickedNotificationSetting.day_of_week_name} time={clickedNotificationSetting.time} email={clickedNotificationSetting.email} notification_type_name={clickedNotificationSetting.notification_type_name} onDayOfWeekChange={onDayOfWeekChange} onTimeChange={onTimeChange} onNotificationTypeChange={onNotificationTypeChange} onSubmit={onDeleteClick} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onNotificationSettingClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout >
        )
    }
}

export default NotificationSetting;