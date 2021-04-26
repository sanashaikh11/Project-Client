import jwt_decode from "jwt-decode";

export default class AuthService {

    isUserLoggedIn = () => {
        const token = this.getToken();
        if (token) {
            return true;
        }
        return false;
    }

    setToken = (token) => {
        localStorage.setItem('token', token)
    }

    getToken = () => {
        return localStorage.getItem('token')
    }

    clearToken = () => {
        localStorage.removeItem('token');
    }

    decodeToken = () => {
        const token = this.getToken();
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            return decodedToken?.user;
        }
    }

    getUserId = () => {
        const decodedToken = this.decodeToken();
        if(decodedToken) {
            return decodedToken.id;
        }
    }

    getUserEmail = () => {
        const decodedToken = this.decodeToken();
        if(decodedToken) {
            return decodedToken.email;
        }
    }

    getUserRole = () => {
        const decodedToken = this.decodeToken();
        if(decodedToken) {
            return decodedToken.role;
        }
    }



}