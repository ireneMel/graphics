class Error extends Error {
    constructor(message, status, data) {
        super(message); // Pass the message to the Error constructor
        this.status = status;
        this.data = data;
    }
}