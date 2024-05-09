import React, {useContext, useEffect, useRef, useState} from 'react';
import InputAreaContext from "../context/InputAreaContext";
import {sumbitToCalc} from "../api/apiClient";
import Graphics from "./molecules/Graphics";
import {Col, Row, Form, Button} from "react-bootstrap";
import {Node as MathJaxNode, Context as MathJaxContext} from 'react-mathjax2';
import "../styles/styles.css"

InputSection.defaultProps = {
    sectionId: 0,
    addSection: () => {
    }
}

//TODO: implement addSection
function InputSection({sectionId, addSection}) {
    const {userInput, setInput} = useContext(InputAreaContext)
    const [latexOutput, setLatexOutput] = useState("");
    const [isError, setIsError] = useState(false);
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const useHasChanged = (val) => {
        const prevVal = usePrevious(val)
        return prevVal !== val
    }

    const hasVal1Changed = useHasChanged(userInput)

    useEffect(() => {
        if (hasVal1Changed) {
            showError()
        }
    }, [userInput])


    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleStart = async () => {
        setIsError(false);
        const body =
            {
                sectionId: sectionId,
                task: userInput.replace(/\\{2}/g, "\\").replace(/\\n/g, "\n")
            };
        try {
            await sumbitToCalc(body).then((resp) => {
                console.log(resp)
                if (resp.status === "ERROR") {
                    showError(resp.errorMsg);
                } else {
                    setLatexOutput(resp);
                }

            });
        } catch (e) {
            showError(e.message)
        }
    }

    const [error, setError] = useState(null);
    const showError = (error) => {
        setError(error)
        setIsError(true)
        let images = document.querySelectorAll("#graph-additional-img")
        while(images.length > 0) {
            images[0].parentNode.removeChild(images[0]);
        }
    }

    const renderLatexLines = (lines) => {
        if (!lines || lines === "") return;

        let array = lines.replace(/ \\ /g, '').split('$');
        let res = array.map((line, index) => {
            return line && !line.match(/^\$?\s*\$?$/) &&
                <div className="mathjax-node" key={index}>
                    <MathJaxNode inline onError={() => showError}>{line}</MathJaxNode>
                </div>;
        })
        return res;
    };

    return (
        <MathJaxContext input="tex" options={{
            asciimath2jax: {
                useMathMLspacing: true,
                delimiters: [["$$", "$$"]],
                preview: "none",
            },
            TeX: {
                extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]
            }
        }}>
            {/*// <MathJaxContext*/}
            {/*//     script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">*/}
            <Row className="mx-4">

                <Col className="m-0 p-0 mb-3">
                    <Button variant="light" className="me-2" onClick={handleStart}>
                        <i className="bi bi-play-fill"></i>
                    </Button>
                    <Button variant="light" onClick={addSection}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                </Col>

                <Form.Control as="textarea" className="shadow p-3 mb-3 bg-white rounded"
                              placeholder="Enter text here..."
                              onChange={handleChange}
                              value={userInput}
                              style={{resize: "none"}}/>

                {!isError && <Row className="mathjaxnode-container p-0 m-0 mb-3" style={{backgroundColor: '#fafafa'}}>
                    {renderLatexLines(latexOutput.latex)}
                </Row>}
                <div>
                    {!isError && <Graphics response={latexOutput}/>}
                </div>

                {error && <div style={{color: 'red'}}>{error}</div>}
            </Row>
        </MathJaxContext>
        // </MathJaxContext>
    )
        ;
}

export default InputSection;