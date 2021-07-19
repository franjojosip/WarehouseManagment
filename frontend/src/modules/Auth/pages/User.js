import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import UserViewStore from '../stores/UserViewStore'
import Table from '../../../common/layouts/Table';
import ModalUser from '../components/ModalUser';
import Loading from '../../../common/layouts/Loading';

import "../styles/User.css";

@inject(
    i => ({
        viewStore: new UserViewStore(i.rootStore)
    })
)

@observer
class User extends React.Component {
    render() {
        const { isLoaderVisible, title, clickedUser, onRoleChange, columns, rows, roles, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange, onPasswordChange, onUserClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            let phoneNumber = "";
            if (element.phone.length > 6) {
                phoneNumber = element.phone.slice(0, 3) + " - " + element.phone.slice(3, 6) + " - " + element.phone.slice(6, element.phone.length);
            }
            else {
                phoneNumber = element.phone.slice(0, 3) + " - " + element.phone.slice(3, element.phone.length)
            }
            return (<tr key={i}>
                <td className="pt-3-half">{element.fname} {element.lname}</td>
                <td className="pt-3-half">{element.email}</td>
                <td className="pt-3-half">{phoneNumber}</td>
                <td className="pt-3-half">{element.role_name}</td>
                <td>
                    <span className="table-edit">
                        <button type="button" onClick={() => onUserClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                            Edit
                        </button>
                    </span>
                </td>
                <td>
                    <span className="table-remove">
                        <button type="button" onClick={() => onUserClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                            Obriši
                        </button>
                    </span>
                </td>
            </tr>);
        });
        return (
            <Layout>
                <Loading visible={isLoaderVisible} />
                <ModalUser modalTarget="modalTargetAdd" roles={roles} onSubmit={onCreateClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalUser modalTarget="modalTargetEdit" roles={roles} onSubmit={onEditClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalUser modalTarget="modalTargetDelete" roles={roles} onSubmit={onDeleteClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <Table title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onUserClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
            </Layout>
        )
        
    }
}

export default User;