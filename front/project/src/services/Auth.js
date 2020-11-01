export class Auth {
    isConnected = () => {
        return (localStorage.getItem('user') !== null) ? false : true
    }
}