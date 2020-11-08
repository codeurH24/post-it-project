

export const list = async () => {
    return await fetch(`http://localhost:8888/api/projects`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
        }
    })
    .then(resp => {
        console.log('Get projects resp', resp)
        if(!resp.ok) {
            if(resp.status === 401) 
                console.log('Non autorisé');
            
        }
        return resp;
    })
    .catch(error => {
        console.error('SERVER IS DOWN');
        console.error(error);
    })
}



export const create = async (payload) => {
    return await fetch('http://localhost:8888/api/projects',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
        },
        body: payload.body
    })
    .then(resp => {
        console.log('resp', resp);
        
        if(!resp.ok) {
            if(resp.status === 401) 
                console.log('Non autorisé');
            
        }
        return resp;
    })
    .catch(error => {
        console.error('SERVER IS DOWN');
        console.error(error);
    })
}


export const remove = async (payload) => {
    
    console.log('remove ','http://localhost:8888/api/projects/',payload.id)
    return await fetch('http://localhost:8888/api/projects/'+payload.id,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
        }
    })
    .then(resp => {
        console.log('resp', resp);
        
        if(!resp.ok) {
            if(resp.status === 401) 
                console.log('Non autorisé');
            
        }
        return resp;
    })
    .catch(error => {
        console.error('SERVER IS DOWN');
        console.error(error);
    })
}