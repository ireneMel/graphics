import React, {useState} from 'react';
import '../../styles/styles.css';
import {Button, Card, Col, Collapse, Row} from 'react-bootstrap';

const Section = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <Card className="mb-3">
            <Card.Header onClick={toggleOpen}>
                <Row className="align-items-center">
                    <Col>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-primary" aria-controls="example-collapse-text" aria-expanded={isOpen}>
                            {isOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Collapse in={isOpen}>
                <div id="example-collapse-text">
                    <Card.Body>
                        {children}
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    )

    return (
        <div className="foldable-section">
            <Button
                onClick={toggleOpen}
                aria-controls="example-collapse-text"
                aria-expanded={isOpen}
            >
                {title}
            </Button>
            <Collapse in={isOpen}>
                <div id="example-collapse-text">
                    {children}
                </div>
            </Collapse>
            <i className="bi bi-arrow-down"></i>
            <div className="section-header" onClick={toggleOpen}>
                <h2>{title}</h2>
                <button>{isOpen ? '-' : '+'}</button>
            </div>
            <div className={`section-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
            {/*{isOpen &&*/}
            {/*    <div id="kbd_plots" className="kbd collapse">*/}
            {/*        <div className="well well-small">*/}
            {/*            <div id="kbd_plot_2d_examples" className="collapse">*/}
            {/*                <div className="section-content">*/}
            {/*                    {children}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};

export default Section;
