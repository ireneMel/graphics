import './App.css';
import Plot from "./views/Plot";
import InputArea from "./views/InputArea";
import React, {useState} from "react";
import InpuAreaContext from "./context/InputAreaContext";

function App() {
    const [userInput, setInput] = useState("");

    return (
        <div className="App">
            <div className="container">
                <InpuAreaContext.Provider value={{userInput, setInput}}>
                    <Plot/>
                    <InputArea></InputArea>
                </InpuAreaContext.Provider>
            </div>
        </div>
    );
}

export default App;
