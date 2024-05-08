import React, {useContext} from 'react';
import InpuAreaContext from "../../context/InputAreaContext";

function ExampleButton({inserts, back, title, label}) {

    const {input, setInput} = useContext(InpuAreaContext);
    const handleClick = (insertText) => {
        setInput(prevText => insertText);
    };

    return (
        <button
            onClick={() => handleClick(inserts)}
            className="btn  btn-sm"
            title={title}
            style={{margin: '5px', boxShadow: '0px 3px 6px rgba(0,0,0,0.36)'}}>
            {label}
        </button>
    );
}

export default ExampleButton;