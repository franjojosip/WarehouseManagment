export const saveUser = (user) => {
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
    return user != null && user.id != "";
}

export const isUserAdmin = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    return user != null && user.id != "" && user.role == "Administrator";
}