enum SameSite { Strict = "Strict", Lax = "Lax", None = "None" };

type ExpireDateObj = { Y?: number, M?: number, W?: number, d?: number, h?: number, m?: number, s?: number };
type TimesInMsObj = { [key: string]: number };

type SetCookieFunc = (key: string, value: any, options?: {
    expiresIn?: number | string | ExpireDateObj,
    path?: string,
    domain?: string,
    sameSite?: SameSite,
    secure?: false,
    httpOnly?: false,
}) => void;
type SetLocalStorageItemFunc = (key: string, value: any, options?: {
    expiresIn?: number | string | ExpireDateObj
}) => void;
type GetFunc = (key: string) => any;
type RemoveFunc = (key: string) => void;
type ConvertSecondsToDateFunc = (seconds: number) => Date;
type ConvertObjectToDateFunc = (dateObject: ExpireDateObj) => Date;
type ConvertStringToDateFunc = (str: string) => Date;
type SyncLocalStorageFunc = () => void;
type IsValidJSONFunc = (value: string) => boolean;
type GetAllFunc = () => object;
type ConvertExpiresInToDateFunc = (options: any) => any;

const cookieDefaultExpireTime = { timeType: "W", value: 1 };
const localStorageDefaultExpireTime = { timeType: "Y", value: 1 };

class Coocal {
    static setCookie : SetCookieFunc = (key, value, options?) => {
        if (!key || !value) return null;

        let expireDate = new Date(new Date().getTime() + TimesInMs[cookieDefaultExpireTime.timeType] * cookieDefaultExpireTime.value);

        expireDate = convertExpiresInToDate(options) || expireDate;

        document.cookie = `${key}=${JSON.stringify(value)};expires=${expireDate.toUTCString()};path=${options?.path || "/"};SameSite=${options?.sameSite || ""};${options?.secure ? "secure" : ""};domain=${options?.domain || window.location.hostname};`;
    }
    
    static getCookie : GetFunc = (key) => {
        let matchedkey = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        return matchedkey ? JSON.parse(matchedkey.pop()) : undefined;
    }

    static getAllCookies : GetAllFunc = () => {
        let cookies = [];
        document.cookie.split(';').forEach(cookie => {
            const [key, value] = cookie.split('=').map(c => c.trim());
            cookies.push({key, value});
        });
        return cookies;
    }

    static removeCookie : RemoveFunc = (key) => {
        let pastDate = new Date(new Date().getFullYear() - 1).toUTCString();
        document.cookie = `${key}=; expires=${pastDate}`;
    }

    static setLocalStorageItem : SetLocalStorageItemFunc = (key, value, options?) => {
        if (!key || !value) return null;

        let expireDate = new Date(new Date().getTime() + TimesInMs[localStorageDefaultExpireTime.timeType] * localStorageDefaultExpireTime.value);

        expireDate = convertExpiresInToDate(options) || expireDate;
        
        localStorage.setItem(key, JSON.stringify({ value, expireDate }));
    }

    static getLocalStorageItem : GetFunc = (key) => {
        syncLocalStorage();
        let item = localStorage.getItem(key);

        if (item) {
            if (isValidJSON(item)) {
                return JSON.parse(item).value;
            }
            else {
                return item;
            }
        }
        return undefined;        
    }

    static getAllLocalStorageItems : GetAllFunc = () => {
        syncLocalStorage();
        let items = [];

        Object.keys(localStorage).forEach(key => {
            let item = localStorage[key];

            if (isValidJSON(item)) {
                items.push({key, ...JSON.parse(item)});
            }
            else {
                items.push({key, value: item});
            }
        });
        return items;
    }

    static removeLocalStorageItem : RemoveFunc = (key) => {
        localStorage.removeItem(key);
    }
}

const TimesInMs : TimesInMsObj = {
    Y: 31556926000,
    M: 2629743830,
    W: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000
}

const convertSecondsToDate : ConvertSecondsToDateFunc = (seconds) =>  {
    return new Date(new Date().getTime() + TimesInMs.s * seconds);
}

const convertObjectToDate : ConvertObjectToDateFunc = (dateObject) =>  {
    let now = new Date();
    let totalTime = 0;

    Object.keys(dateObject).forEach(key => {
        let value = dateObject[key];
        
        if (value && typeof value == "number") {
            totalTime += TimesInMs[key] * value;
        }
    });
    return new Date(now.getTime() + totalTime);
}

const convertStringToDate : ConvertStringToDateFunc = (str) => {
    let now = new Date();
    let totalTime = 0;
    let usedDateTypes = [];

    str.split(" ").forEach(strDate => {
        let value = strDate.substring(0, strDate.length - 1);
        let dateType = strDate.charAt(strDate.length - 1);
        
        if (TimesInMs[dateType] && Number(value) && usedDateTypes.indexOf(dateType) == -1) {
            totalTime += TimesInMs[dateType] * Number(value);
            usedDateTypes.push(dateType);
        }
        else
        {
            throw new Error("Invalid date string.");
        }
    });
    return new Date(now.getTime() + totalTime);
}

const syncLocalStorage : SyncLocalStorageFunc = () => {
    Object.keys(localStorage).forEach(key => {
        let itemJSON = localStorage.getItem(key);

        if (isValidJSON(itemJSON)) {
            let item = JSON.parse(itemJSON);

            if (item.expireDate && new Date(item.expireDate).getTime() < new Date().getTime()) {
                localStorage.removeItem(key);
            }
        }
    });
}

const isValidJSON : IsValidJSONFunc = (value) => {
    try {
        JSON.parse(value);
    } catch (error) {
        return false;
    }
    return true;
}

const convertExpiresInToDate : ConvertExpiresInToDateFunc = (options) => {
    if (options && options.expiresIn) {
        let expiresIn = options.expiresIn;
        let expireDate;

        if (typeof expiresIn == "number") {
            expireDate = convertSecondsToDate(expiresIn);
        }
        else if (typeof expiresIn == "string") {
            expireDate = convertStringToDate(expiresIn);
        }
        else if (expiresIn instanceof Object) {
            expireDate = convertObjectToDate(expiresIn);
        }
        return expireDate;
    }
    return null;
}

export default Coocal;