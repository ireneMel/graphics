import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
    // baseURL: "https://mathpar.ukma.edu.ua/",
    headers: {
        "content-type": "application/json",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-UA,en;q=0.9,uk-UA;q=0.8,uk;q=0.7,en-GB;q=0.6,en-US;q=0.5,ru;q=0.4",
        "x-requested-with": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "true",
        "referrer": "no-referrer"
    },
    withCredentials: false,
    //"referrer": "https://localhost:8080",
    // "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "POST",
    // "mode": "cors",
    // "credentials": "include"
})

export const calc = async (body) => {
    const response = await API.post(`/calc`, body)
    return response.data;
}

// fetch("https://mathpar.ukma.edu.ua/api/calc", {
//     "headers": {
//         "accept": "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-UA,en;q=0.9,uk-UA;q=0.8,uk;q=0.7,en-GB;q=0.6,en-US;q=0.5,ru;q=0.4",
//         "content-type": "application/json",
//         "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"Windows\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://mathpar.ukma.edu.ua/en/index.html",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "{\"sectionId\":0,\"task\":\" SPACE=R64[x];\\\\set2D(0, 5, -5, 10);\\n A=[[0, 1, 2, 3,  4, 5],[3, 0, 4, 10, 5, 10]];\\n  t=\\\\table(A);\\n p=\\\\approximation(t,4);\\n P=\\\\plot(p );\\n T=\\\\tablePlot(t);\\\\showPlots([P,T]);\\\\print(p);\"}",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });