import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/components/Layout"
import HomeViewStore from '../stores/HomeViewStore';
import { ToastContainer } from 'react-toastify';

import "../styles/Home.css";

@inject(
    i => ({
        viewStore: new HomeViewStore(i.rootStore)
    })
)

@observer
class Home extends React.Component {
    render() {
        const { isLoaderVisible } = this.props.viewStore;

        return (
            <Layout isLoaderVisible={isLoaderVisible}>

                <div className="row" style={{ marginLeft: 20, marginRight: 10 }}>
                    <div className="col-md-4 filterColumn">
                        TEXT
                    </div>
                </div>
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        );
    }
}

export default Home;