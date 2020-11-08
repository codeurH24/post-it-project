
export const create = async (payload) => {
    return await fetch('http://localhost:8888/api/persons', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: payload.body
    })
    .then(resp => {
        console.log('resp', resp)

        if(resp.ok === false) {
            if(resp.status === 401) 
                console.error('Non autorisé');
        }

        return resp
    })
    .catch(error => {
        console.error('SERVER IS DOWN');
        console.error(error);
    })
}