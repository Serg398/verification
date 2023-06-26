import C from './C';
import { ExtendedError, CommonJsonError, CommonStringError } from './errors';


const fetchApi =
    (path, params) =>
        fetch(
            `${C.BASE_PATH}/api${path}`,
            {
                ...params,
                // credentials: 'include',
            }
        );

const throwBadResponseFormat = () => {
    throw new ExtendedError('Ошибка при получении данных', 400, 'BAD_RESPONSE_FORMAT');
}


const getContentByType = (response, type) => {
    switch (type) {
        case 'empty':
            return null;
        case 'json':
            return response.json().catch(throwBadResponseFormat);
        default:
            return response.json().catch(throwBadResponseFormat);
    };
}

const fetchApiSendJson =
    (url, method, params) =>
        fetchApi(
            url,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                method: method,
                body: JSON.stringify(params),
            }
        );

const handleError = (response) =>
    response.json().then(
        (data) => {
            throw data.error ?
                new ExtendedError(data.message, data.status, data.code, data.info) :
                new CommonJsonError(data.status, data);
        },
        () => {
            throw new CommonStringError(response.statusText, response.status);
        }
    );


const checkStatus = (response, type) => {
    const { status } = response;
    return (
        status !== undefined && status >= 200 && status < 300 ?
            getContentByType(response, type) :
            handleError(response)
    );
}

const returnJson = (response) => checkStatus(response, 'json');
const returnEmpty = (response) => checkStatus(response, 'json');

export const getListPhoto = () => fetchApiSendJson('/photos').then(returnJson);
export const createPhoto = () => fetchApiSendJson('/create').then(returnJson);
export const removePhoto = () => fetchApiSendJson('/remove').then(returnJson);
export const getStatus = () => fetchApiSendJson('/status').then(returnJson);
export const getStatusMode = () => fetchApiSendJson('/mode').then(returnJson);
export const postStatusMode = (params) => fetchApiSendJson('/mode', "POST", params).then(returnEmpty);