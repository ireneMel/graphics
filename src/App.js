import './App.css';
import ExampleSections from "./views/ExampleSections";
import InputSection from "./views/InputSection";
import React, {useState} from "react";
import InpuAreaContext from "./context/InputAreaContext";
import {Col, Row} from "react-bootstrap";

function App() {
    const [userInput, setInput] = useState("");

    return (
        <Row className="mt-5 mx-4" >
            <InpuAreaContext.Provider value={{userInput, setInput}}>
                <Col md={4}>
                    <ExampleSections/>
                </Col>

                <Col md={8}>
                    <InputSection></InputSection>
                </Col>
            </InpuAreaContext.Provider>
        </Row>
    );
}

export default App;
