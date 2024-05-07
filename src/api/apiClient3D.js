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