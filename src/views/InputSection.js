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
            await sumbitToCalc(body).then(async (resp) => {
                console.log(resp)
                if (resp.status === "ERROR") {
                    showError(resp.errorMsg);
                } else {
                    let parameters = convertSet2DToReplot(body.task) //hasMoreThanFourParameters(body.task);
                    if (parameters!=null) {
                        const body = {
                            sectionId: sectionId,
                            task: parameters
                        };
                        await sumbitToCalc(body).then((resp) => {
                            setLatexOutput(resp);
                        })
                    } else {
                        setLatexOutput(resp);
                    }
                }

            });
        } catch (e) {
            showError(e.message)
        }
    }

    // set2D([x0,x1, y0, y1],['xTitle','yTitle','title'] ,[0,1,12,3,5]).
    // 1) 1 — означает: установить режим черно-белый (0 - цветной)
    // 2) 1 — означает: установить равный масштаб по обеим осям (0- золотое сечение)
    // 3) это размер шрифта для подписей
    // 4) это толщина линий графиков 5) это толщина координатных осей
    const handleAdditionalParameters = (parameters) => {
        return `\\replot([],${parameters.slice(4).join(",")});`;
    }

    //check if there are additional parameters requested
    function hasMoreThanFourParameters(task) {
        return task.trim().split(/\s+/);
    }

    function convertSet2DToReplot(text) {
        const regex = /\\set2D\((.*?)\);/g;

        let match;
        while ((match = regex.exec(text)) !== null) {
            const set2DCommand = match[0];
            const parameters = set2DCommand.substring(7, set2DCommand.length - 2).split(/\s*,\s*/);

            if (parameters.length > 9) {
                const replotCommand = `\\replot([],false,false,${parameters.slice(9).join(",")},);`;
                return replotCommand;
            } else {
                return null;
            }
        }
    }

    const [error, setError] = useState(null);
    const showError = (error) => {
        setError(error)
        setIsError(true)
        let images = document.querySelectorAll("#graph-additional-img")
        while (images.length > 0) {
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