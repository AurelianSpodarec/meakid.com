import config from './../../config_cocart';
import { getResponseContent, RequestError } from '../../requests';

const cocartRequest = async function (endpoint, method, data) {
    const response = await fetch(`${config.API_URL}/${config.API_VERSION}/${endpoint}`, {
        method,

        body: JSON.stringify(data)
    })

    const content = await getResponseContent(response)
    if (response.ok) return content;

    throw new RequestError(response.statusText, response.status, content)
}

export default cocartRequest;