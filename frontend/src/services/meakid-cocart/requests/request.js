import config from './../config_meakid_cocart';

import {
    getResponseContent,
    RequestError
} from './../../requests';

const CoCartRequest = async function (endpoint, method, data) {
    const response = await fetch(`${config.API_URL}/${config.API_VERSION}/${endpoint}`, {
        method,
        "credentials": 'include',
        "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const content = await getResponseContent(response)

    if (response.ok) return content;

    throw new RequestError(response.statusText, response.status, content)
}

export default CoCartRequest;