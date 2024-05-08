import React, {memo, useContext, useState} from 'react';
import InputAreaContext from "../context/InputAreaContext";
import {sumbitToCalc, spaceMemory} from "../api/apiClient";
import Graphics from "./molecules/Graphics";
import {Col, Row, Form, Button} from "react-bootstrap";

const LatexLine = memo(({line}) => (
    <div>
        {/*<InlineMath>{line}</InlineMath>*/}
        <div>
            {/*{(line !== "" && line) && (*/}
            {/*    <MathJax>{latexCode}</MathJax>*/}
            {/*)}*/}
            {/*This is an inline math formula: <MathJaxNode inline>{line}</MathJaxNode>*/}
        </div>
    </div>
));

InputSection.defaultProps = {
    sectionId: 0,
    addSection: () => {}
}

//TODO: implement addSection
function InputSection({sectionId, addSection}) {
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
                task: userInput.replace(/\\{2}/g, "\\").replace(/\\n/g, "\n")
            };

        const data = await sumbitToCalc(body).then((resp) => {
            console.log(resp)
            setLatexOutput(resp)
        });
        const spaceMem = await spaceMemory();
    }

    const [isShowInputFields, setIsShowInputFields] = useState(true);

    const showOut = () => setIsShowInputFields(true);
    const showIn = () => setIsShowInputFields(false);

    const renderLatexLines = (lines) => {
        if (!lines || lines === "") return;
        let array = lines.split('\n\n')
        console.log("LINES", lines)
        // return array.map((line, index) =>
        //     !line.match(/^\$?\s*\$?$/) ? (
        //         // <MathJaxNode key={index} formula={line} />
        //         // <MathJax>{line}</MathJax>
        //     ) : null
        //     //line.trim() !== '' //&& line.replace(/\hline/g, '\\')
        // );
    };


    return (
        // <MathJaxContext
        //     script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
        <Row className="mx-4">
            <Col className="m-0 p-0 mb-3">
                <Button variant="light" className="me-2" onClick={handleStart}>
                    <i className="bi bi-play-fill"></i>
                </Button>
                <Button variant="light" onClick={addSection}>
                    <i className="bi bi-plus-lg"></i>
                </Button>
            </Col>

            <Form.Control as="textarea" className="shadow p-3 mb-5 bg-white rounded" placeholder="Enter text here..."
                          onChange={handleChange} value={userInput} style={{resize: "none"}}/>

            <Graphics response={latexOutput}/>
            <div className="res_panel">{/* Render results here */}</div>
            {/*<ExampleSections latex={userInput.task}/>*/}
            <div id={`section_${0}`}>
                {/*<div className="tex_panel">{renderLatexLines(latexOutput.task)}</div>*/}
                {isShowInputFields ? (
                    <>
                        {/*<form>{renderLatexLines(latexOutput.latex)}</form>*/}
                        <div className="res_panel">{/* Render results here */}</div>
                    </>
                ) : (
                    <>
                        {/*<div className="tex_panel">{renderLatexLines(latexOutput.latex)}</div>*/}
                        {/*<div className="graph-additional">/!* Render additional graphics here *!/</div>*/}
                        <Graphics response={latexOutput}/>
                    </>
                )}
            </div>
        </Row>
        // </MathJaxContext>
    )
        ;
}

export default InputSection;