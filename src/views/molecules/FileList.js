import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
    const [filelist, setFilelist] = useState([]);

    useEffect(() => {
        update();
    }, []);

    const update = async () => {
        try {
            const response = await axios.get('/api/files');
            setFilelist(response.data.filenames);
        } catch (error) {
            console.error(error);
        }
    };

    //TODO
    const handleFileClick = (filename) => {
        // sections.insertTextToActiveSection(filename);
        // Replace with your own logic
    };

    const handleDownloadClick = (filename) => {
        const filenameEncoded = encodeURIComponent(filename);
        window.open(`/api/files?filename=${filenameEncoded}&download=true`);
    };

    const handleDeleteClick = async (filename) => {
        const filenameEncoded = encodeURIComponent(filename);
        try {
            await axios.delete(`/api/files?filename=${filenameEncoded}`);
            update();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {filelist.map((filename) => (
                <div key={filename}>
                    <span onClick={() => handleFileClick(filename)}>{filename}</span>
                    <button onClick={() => handleDownloadClick(filename)}>Download</button>
                    <button onClick={() => handleDeleteClick(filename)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default FileList;