export class Auth {
    isConnected = () => {
        const isConnected = (localStorage.getItem('user') === null) ? false : true;
        isConnected ?
            console.log('User est connecté', JSON.parse(localStorage.getItem('user')).token)
            :
            console.log('User n\'est pas connecté');

        return isConnected
    }

    connexion = () => {
        
    }
}