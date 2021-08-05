import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import ScheduleViewStore from '../stores/ScheduleViewStore'
import { ToastContainer } from 'react-toastify';

import "../styles/Schedule.css";
import ScheduleForm from '../components/ScheduleForm';

@inject(
    i => ({
        viewStore: new ScheduleViewStore(i.rootStore)
    })
)

@observer
class Schedule extends React.Component {
    render() {
        const { isLoaderVisible, errorMessage, onRefreshClick, isSubmitDisabled, onPasswordChange, password } = this.props.viewStore;
        return (
            <Layout isLoaderVisible={isLoaderVisible}>
                <ScheduleForm errorMessage={errorMessage} password={password} onSubmit={onRefreshClick} onPasswordChange={onPasswordChange} isSubmitDisabled={isSubmitDisabled} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout >
        )
    }
}

export default Schedule;