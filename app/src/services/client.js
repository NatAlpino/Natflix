import axios from 'axios'
/**
 * 
 * @param {string} method - Aceita um verbo http (GET, PUT, POST, DELETE, PATCH) 
 * @param {string} url - URL a ser chamada
 * @returns {Promise} - Response
 */
function fetchRequest(method, url) {
    return fetch(url, {
        method: method //GET, PUT, POST, DELETE
    }).then(response => 
        response.json())
}


async function axiosRequest(method, url) {
    return axios(url, {
        method: method
    }).then(response => 
        response.data)
}


const makeRequest = async (client, url, method) => {
    const param = client.toLowerCase()
    if (param === 'axios') {
        return axiosRequest(method, url)
    } else if (param === 'fetch') {
        return fetchRequest(method, url)
    } else {
        throw new Error('Client inválido!')
    }
}

export default makeRequest
