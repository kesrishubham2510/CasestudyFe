class NetworkError extends Error{
    constructor(message){
        super(message);
    }
}

class ClientError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name = "Client Error";
    }
}

class ServerError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name = "Server Error";
    }
}

const errors = {
    'networkError': NetworkError,
    'clientError': ClientError,
    'serverError': ServerError
};

export default errors;