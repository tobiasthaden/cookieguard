export const expireCookie = function(name, domain, path) {
    document.cookie =
        name +
        "=" +
        (path ? ";path=" + path : "") +
        (domain ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
};

export const tap = function(value, callback) {
    callback(value);
    return value;
};
