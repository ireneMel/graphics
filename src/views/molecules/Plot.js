import React, { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';

export function Plot({ latex }) {
    const container = useRef(null);
    const [functions, setFunctions] = useState([]);

    useEffect(() => {
        if(latex === "" || latex === undefined)
            return;
        // Parse the LaTeX code
        console.log('LATEX',latex)
        const parsed = latex.split(';');
        //const functions = parsed[1].split('\\mathbf{plot}')[1].replace(/[([\])]/g, '').split(',');
        setFunctions([]);
    }, [latex]);

    useEffect(() => {
        if (functions.length > 0) {
            functionPlot({
                target: container.current,
                data: functions.map(fn => ({ fn, sampler: 'builtIn', graphType: 'polyline' })),
                grid: true,
                yAxis: {domain: [-10, 10]},
                xAxis: {domain: [-10, 10]}
            });
        }
    }, [functions]);

    return <div ref={container}></div>;
}