import { toastShort } from './ToastUtil';

function httpFetch(url, method, formData, callBack) {

    let headParams = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Param-Decode': 'false',
    }
    let paramsArray = [];

    if (formData) {
        Object.keys(formData).forEach(key => {
            formData[key] ? paramsArray.push(key + '=' + encodeURIComponent(formData[key])) : ''
        });
    }
    let parms = {
        method: method,
        headers: headParams,
        timeout: 10 * 1000,
        body: method === 'GET' ? null : paramsArray.join('&'),
    }


    fetch(url, parms).then((response) => {
        if (response.ok) {

            return response.json();
        } else {
            if (callBack.onError) {
                callBack.onError(response.code, "")
            } else {
                toastShort(response.code, false)
            }
        }
    }).then((responseJson) => {
        // console.log("http:" + url + "response:" + JSON.parse(responseJson));
        if (responseJson&&responseJson.code==0) {
            callBack.onSuccess(responseJson);
        }else{
            if(callBack.onError){
                callBack.onError(responseJson.code,responseJson.message);
            }
        }
    }).catch((error) => {
        // console.log("http:" + url + "response:" + error);
        let errMsg = error.toString();
        if (callBack.onError) {
            callBack.onError("-1", errMsg);
        } else {
            toastShort(errMsg, false);
        }
    })
}

export { httpFetch };