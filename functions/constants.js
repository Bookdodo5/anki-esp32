exports.constants = {
    NOT_FOUND : 404,
    VALIDATION_FAILED : 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
}

exports.intervalTime = { // minutes
    0 : 1,
    1 : 3,
    2 : 10,
    3 : 60,
    4 : 60*24,
    5 : 60*24*3,
    6 : 60*24*7,
    7 : 60*24*30,
    8 : 60*24*30*3,
    9 : 60*24*30*12,
}