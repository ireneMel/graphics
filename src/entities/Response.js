class Response {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;

        //output in latex
        this.latex = data.latex;
        this.sectionId = data.sectionId
        this.data = data;

        //TODO: implement warnings and errors
    }

}

export default Response;
