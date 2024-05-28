import {API} from "./apiClient";

export const getMatrix3D = async (sectionId) => {
    try {
        const response = await API.get(`/servlet/matrix3d?section_number=` + sectionId)
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}

export const fetchMatrix3D = async (sectionId, matrixString) => {
    try {
        const response = await API.post(`/servlet/matrix3d?section_number=` + sectionId, "matrix=" + matrixString)
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}

export const fetchPlot3DImplicit = async (sectionId, taskString) => {
    try {
        const response = await API.post(`/api/plot3dimplicit`, {sectionId, task: taskString})
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}

export const fetchPlot3DExplicit = async (sectionId, taskString) => {
    try {
        const response = await API.post(`/api/plot3dexplicit`, {sectionId, task: taskString})
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}

export const fetchPlot3DParametric = async (sectionId, taskString) => {
    try {
        const response = await API.post(`/api/plot3dparametric`, {sectionId, task: taskString});
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}


export const fetchShowplots3d = async (sectionId, taskString) => {
    if (taskString.indexOf('\\intersection3D') >= 0) {
        taskString = taskString.replace('\\intersection3D', '\\showPlots3D');
    }
    try {
        const response = await API.post(`/api/showplots3d`, {sectionId, task: taskString})
        return response.data;
    } catch (error) {
        console.error('Error fetching 3D parametric plot:', error);
    }
}