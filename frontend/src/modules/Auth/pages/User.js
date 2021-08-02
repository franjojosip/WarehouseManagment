import React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../../../common/layouts/Layout"
import UserViewStore from '../stores/UserViewStore'
import Table from '../../../common/layouts/Table';
import ModalUser from '../components/ModalUser';
import { ToastContainer } from 'react-toastify';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../styles/User.css";

@inject(
    i => ({
        viewStore: new UserViewStore(i.rootStore)
    })
)

@observer
class User extends React.Component {
    render() {
        const { isLoaderVisible, roleFilter, onResetFilterClick, onRoleFilterChange, errorMessage, title, clickedUser, onRoleChange, columns, rows, roles, page, pageSize, totalPages, previousEnabled, nextEnabled, isSubmitDisabled, onPageClick, onChangePageSize, onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange, onPasswordChange, onUserClicked, onPreviousPageClick, onNextPageClick, onEditClick, onDeleteClick, onCreateClick } = this.props.viewStore;

        let tableRows = rows.map((element, i) => {
            let phoneNumber = "";
            if (element.phone.length > 6) {
                phoneNumber = element.phone.slice(0, 3) + "-" + element.phone.slice(3, 6) + "-" + element.phone.slice(6, element.phone.length);
            }
            else {
                phoneNumber = element.phone.slice(0, 3) + "-" + element.phone.slice(3, element.phone.length)
            }
            return (<tr key={i}>
                <td className="pt-3-half">{element.fname} {element.lname}</td>
                <td className="pt-3-half">{element.email}</td>
                <td className="pt-3-half">{phoneNumber}</td>
                <td className="pt-3-half">{element.role_name}</td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-edit">
                                <button type="button" onClick={() => onUserClicked(element, false)} data-toggle="modal" data-target="#modalTargetEdit" className="btn btn-primary btn-rounded btn-sm my-0">
                                    Izmijeni
                                </button>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    {
                        element.id !== "" ?
                            <span className="table-remove">
                                <button type="button" onClick={() => onUserClicked(element, false)} data-toggle="modal" data-target="#modalTargetDelete" className="btn btn-danger btn-rounded btn-sm my-0">
                                    Obriši
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
                    <DropdownButton id="customDropdown" variant="secondary" title={roleFilter.name ? roleFilter.name : "Sve uloge"} style={{ marginBottom: 10 }}>
                        <Dropdown.Item key="default_role" onSelect={() => onRoleFilterChange({ role_id: "", role_name: "" })}>Sve uloge</Dropdown.Item>
                        {roles.map((role) => {
                            return <Dropdown.Item key={role.role_id} onSelect={() => onRoleFilterChange(role)}>{role.role_name}</Dropdown.Item>;
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
                <ModalUser modalTarget="modalTargetAdd" errorMessage={errorMessage} roles={roles} onSubmit={onCreateClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalUser modalTarget="modalTargetEdit" errorMessage={errorMessage} roles={roles} onSubmit={onEditClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <ModalUser modalTarget="modalTargetDelete" errorMessage={errorMessage} roles={roles} onSubmit={onDeleteClick} role_name={clickedUser.role_name} fname={clickedUser.fname} lname={clickedUser.lname} email={clickedUser.email} phone={clickedUser.phone} password={clickedUser.password} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} onPasswordChange={onPasswordChange} onRoleChange={onRoleChange} isSubmitDisabled={isSubmitDisabled} />
                <Table filterRow={filterRow} title={title} columns={columns} tableRows={tableRows} page={page} pageSize={pageSize} totalPages={totalPages} previousEnabled={previousEnabled} nextEnabled={nextEnabled} onActionClicked={onUserClicked} onPageClick={onPageClick} onChangePageSize={onChangePageSize} onPreviousPageClick={onPreviousPageClick} onNextPageClick={onNextPageClick} />
                <ToastContainer style={{ fontSize: 15 }} />
            </Layout>
        )

    }
}

export default User;