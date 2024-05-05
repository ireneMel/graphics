import React, {memo, useContext, useState} from 'react';
import InputAreaContext from "../context/InputAreaContext";
import {calc} from "../api/apiClient";
import {Plot} from "./molecules/Plot";
import {Text as MathJaxText, Context as MathJaxContext} from 'react-mathjax2';
import Graphics from "./molecules/Graphics";

const LatexLine = memo(({line}) => (
    <div>
        <MathJaxText inline>{line}</MathJaxText>
    </div>
));

function InputArea() {
    const {userInput, setInput} = useContext(InputAreaContext)
    const [latexOutput, setLatexOutput] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleStart = async () => {
        //TODO: check parameter's correctcness before sending to prevent injections
        //TODO: section ID - number of section on the screen from which the request was sent
        const body =
            {
                sectionId: 0,
                task: userInput.replace(/\\\\/g, "\\n").replace(/\\newline/g, "\n")
            };

        const data = await calc(body);

        console.log(data)
        setLatexOutput(data)
        //setInput(data);

    }
    const [isShowingOut, setIsShowingOut] = useState(false);

    const showOut = () => setIsShowingOut(true);
    const showIn = () => setIsShowingOut(false);

    // function renderLatex(latexOutput, texLines) {
    //     latexOutput.empty();
    //     // Wrap each non-empty line of LaTeX output with <div>.
    //     latexOutput.append($.map(texLines, function (line) {
    //         return !line.match(/^\$?\s*\$?$/) ? $('<div>' + line + '</div>') : null;
    //     }));
    //     MathJax.Hub.Queue(['Typeset', MathJax.Hub, latexOutput.get(0)]);
    // }
    const renderLatexLines = (lines) => {
        if (lines === "") return;
        let array = lines.split('\n\n')
        console.log("LINES", lines)
        return array.map((line, index) =>
            line.trim() !== '' && <LatexLine key={index} line={line}/>
        );
    };
    //task":"\\set2D(-5,5,-4,6); f=3\\arctg(x+1); \\plot([f,-x+5, 3x+5]);"}
    return (
        <MathJaxContext
            script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
            <div>
                <textarea value={userInput} onChange={handleChange}/>
                <button onClick={handleStart}>Start</button>
                <Plot latex={userInput.task}/>
                <Graphics response={latexOutput} />
                <div id={`section_${0}`}>
                    {/*<div className="tex_panel">{renderLatexLines(latexOutput.task)}</div>*/}
                    {/*{isShowingOut ? (*/}
                    {/*    <>*/}
                    {/*        <div className="tex_panel">{renderLatexLines(latexOutput)}</div>*/}
                    {/*        <div className="graph-additional">/!* Render additional graphics here *!/</div>*/}
                    {/*    </>*/}
                    {/*) : (*/}
                    {/*    <>*/}
                    {/*        <form>{renderLatexLines(latexOutput)}</form>*/}
                    {/*        <div className="res_panel">/!* Render results here *!/</div>*/}
                    {/*    </>*/}
                    {/*)}*/}
                </div>
            </div>
        </MathJaxContext>
    );
}

export default InputArea;