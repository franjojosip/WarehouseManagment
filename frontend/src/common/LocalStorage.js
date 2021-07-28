import moment from "moment";

export const saveUser = (user) => {
    user.logged_date = moment().format("YYYY/MM/DD");
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    return user;
}

export const clearUser = () => {
    localStorage.removeItem('user');
}

export const clearStorage = () => {
    localStorage.clear();
}

export const isUserLoggedIn = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    return user&& user.id != "";
}

export const isUserAdmin = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    return user && user.id != "" && user.role == "Administrator";
}

export const isUserTokenExpired = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user && user.logged_date) {
        return moment().diff(user.logged_date, 'days') > 0;
    }
    else return true;

}