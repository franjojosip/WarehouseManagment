import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
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

                <div className="row" style={{ marginLeft:20, marginRight: 10 }}>
                    <div className="column">
                        <div className="card">
                            <h3>Card 1</h3>
                            <p>Some text</p>
                            <p>Some text</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>Card 2</h3>
                            <p>Some text</p>
                            <p>Some text</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>Card 3</h3>
                            <p>Some text</p>
                            <p>Some text</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>Card 4</h3>
                            <p>Some text</p>
                            <p>Some text</p>
                        </div>
                    </div>
                </div>
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        );
    }
}

export default Home;