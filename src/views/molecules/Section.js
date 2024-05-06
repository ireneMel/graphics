import React, {useState} from 'react';
import '../../styles/styles.css';
import Button from "../atoms/Button";

const Section = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="foldable-section">
            <div className="section-header" onClick={toggleOpen}>
                <h2>{title}</h2>
                <button>{isOpen ? '-' : '+'}</button>
            </div>
            {isOpen &&
                <div id="kbd_plots" className="kbd collapse">
                    <div className="well well-small">
                        <div id="kbd_plot_2d_examples" className="collapse">
                            <div className="section-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Section;
