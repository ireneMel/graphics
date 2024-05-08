import axios from "axios";
import $ from 'jquery';

export const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-UA,en;q=0.9,uk-UA;q=0.8,uk;q=0.7,en-GB;q=0.6,en-US;q=0.5,ru;q=0.4",
        "x-requested-with": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "true",
        "Referrer": "http://localhost:3000/en/index.html"
    },
    withCredentials: true,
    "body": null,
    "method": "POST",
})

export const sumbitToCalc = async (body) => {
    const response = await API.post(`/api/calc`, body)
    return response.data;
}

export const spaceMemory = async () => {
    const response = await API.post(`/api/space-memory`)
    return response.data;
}