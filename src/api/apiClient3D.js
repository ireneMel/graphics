import {API} from "./apiClient";

export const getMatrix3D = async (sectionId) => {
    //dataType: text
    const response = await API.get(`/servlet/matrix3d?section_number=` + sectionId)
    return response.data;
}

export const fetchMatrix3D = async (sectionId, matrixString) => {
    const response = await API.post(`/servlet/matrix3d?section_number=` + sectionId, "matrix=" + matrixString)
    return response.data;
}

export const fetchPlot3DImplicit = async (sectionId, taskString) => {
    const response = await API.post(`/api/plot3dimplicit`, {sectionId, task: taskString})
    return response.data;
}

export const fetchPlot3DExplicit = async (sectionId, taskString) => {
    const response = await API.post(`/api/plot3dexplicit`, {sectionId, task: taskString})
    return response.data;
}

export const fetchPlot3DParametric = async (sectionId, taskString) => {
    const response = await API.post(`/api/plot3dparametric`, {sectionId, task: taskString})
    return response.data;
}

export const fetchShowplots3d = async (sectionId, taskString) => {
    if (taskString.indexOf('\\intersection3D') >= 0) {
        taskString = taskString.replace('\\intersection3D', '\\showPlots3D');
    }
    const response = await API.post(`/api/showplots3d`, {sectionId, task: taskString})
    return response.data;
}