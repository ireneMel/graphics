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

/*
{
    "task": "\\set2D(-5,5,-4,6); f=3\\arctg(x+1); \\plot([f,-x+5, 3x+5]);",
    "sectionId": 0,
    "status": "OK",
    "result": "",
    "latex": "$  \\mathbf{set}2D(-5,5,-4,6); f=3 \\mathbf{arctg}(x+1); \\ \\mathbf{plot}([f,-x+5, 3x+5]); $\n\n$ out: $\n\n$  $",
    "warning": null,
    "error": null,
    "stacktrace": null,
    "warningMsg": null,
    "errorMsg": null,
    "filenames": null
}
 */