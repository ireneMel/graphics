import React, {useState, useEffect, useRef, useContext} from 'react';
import {fetchMatrix3D, getMatrix3D, setMatrix3D} from "../../api/apiClient3D";
import {sumbitToCalc} from "../../api/apiClient";
import InputAreaContext from "../../context/InputAreaContext";

const Mathpar3D = ({sectionId}) => {
    const [points3D, setPoints3D] = useState([[-20, -20, -20], [-20, 20, -20], [20, -20, -20], [20, 20, -20],
        [-20, -20, 20], [-20, 20, 20], [20, -20, 20], [20, 20, 20]]);
    const [points2D, setPoints2D] = useState([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]);
    const [matrix, setMatrix] = useState([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    const [oldX, setOldX] = useState(0);
    const [oldY, setOldY] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [shiftDown, setShiftDown] = useState(false);
    const SPEED = 100;
    const MATRIX_PROJ = useRef([
        [500, 0, 500, 250000],
        [0, 500, 350, 175000],
        [0, 0, 1, 0],
        [0, 0, 1, 500]
    ]);
    const canvasRef = useRef(null);
    const [imgPath, setImagePath] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            draw();
        }, 100);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleMouseDown = (event) => {
        setMouseDown(event.button === 0 && event.which === 1);
    }

    const handleMouseUp = () => {
        setMouseDown(false);
        setShiftDown(false);
        update3d(); // replace with actual function
    }

    const handleMouseMove = (event) => {
        if (!mouseDown) {
            return;
        }
        var parent = canvasRef.current.offsetParent;
        var newX = event.pageX - parent.offsetLeft;
        var newY = event.pageY - parent.offsetTop;
        var alpha = (newY - oldY) / SPEED;
        var betta = -(newX - oldX) / SPEED;
        if (alpha < 360 && betta < 360) {
            calc(alpha, betta, -alpha); // replace with actual function
        }
        setOldX(event.pageX - parent.offsetLeft);
        setOldY(event.pageY - parent.offsetTop);
    }

    const handleKeyDown = (evt) => {
        setShiftDown(evt.keyCode === 16);
    }

    const handleKeyUp = () => {
        setShiftDown(false);
    }

    const getMatrix = async () => {
        try {
            const response = await getMatrix3D(sectionId);
            const respParts = response.data.split('*');
            const newMatrix = JSON.parse(respParts[0]);
            const newPoints3D = JSON.parse(respParts[1]);
            newPoints3D[7][0] += newPoints3D[6][0];
            newPoints3D[7][1] += newPoints3D[6][1];
            newPoints3D[7][2] += newPoints3D[5][2];
            setMatrix(newMatrix);
            setPoints3D(newPoints3D);
        } catch (e) {

        }
    }

    const setMatrix3D = async () => {
        try {
            let response = fetchMatrix3D(sectionId, matrix.toString());

        } catch (e) {
        }
    }

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas && canvas.getContext('2d');

        if (!canvas || !ctx || !mouseDown) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgb(128,0,0)";
        ctx.strokeStyle = "black";

        ctx.beginPath();
        ctx.moveTo(points2D[0][0], points2D[0][1]);
        ctx.lineTo(points2D[1][0], points2D[1][1]);
        ctx.lineTo(points2D[2][0], points2D[2][1]);
        ctx.lineTo(points2D[6][0], points2D[6][1]);
        ctx.lineTo(points2D[0][0], points2D[0][1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(points2D[5][0], points2D[5][1]);
        ctx.lineTo(points2D[7][0], points2D[7][1]);
        ctx.lineTo(points2D[3][0], points2D[3][1]);
        ctx.lineTo(points2D[4][0], points2D[4][1]);
        ctx.lineTo(points2D[5][0], points2D[5][1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points2D[5][0], points2D[5][1]);
        ctx.lineTo(points2D[0][0], points2D[0][1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(points2D[7][0], points2D[7][1]);
        ctx.lineTo(points2D[6][0], points2D[6][1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(points2D[3][0], points2D[3][1]);
        ctx.lineTo(points2D[2][0], points2D[2][1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(points2D[4][0], points2D[4][1]);
        ctx.lineTo(points2D[1][0], points2D[1][1]);
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(points2D[i][0], points2D[i][1], 2, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    };

    useEffect(() => {
        draw();
    }, [mouseDown, points2D])

    const projection = () => {
        const newPoints2D = [...points2D]; // create a copy of points2D

        for (let j = 0; j < 8; j++) {
            const x = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                x[i] = matrix[i][0] * points3D[j][0] + matrix[i][1] * points3D[j][1]
                    + matrix[i][2] * points3D[j][2] + matrix[i][3];
            }
            newPoints2D[j][0] = x[0] / x[3];
            newPoints2D[j][1] = x[1] / x[3];
        }

        setPoints2D(newPoints2D);
    }

    useEffect(() => {
        projection();
    }, [matrix, points3D])

    function calc(alpha, beta, scale) {
        var
            sin = 0,
            cos = 0,
            matrixOld;

        if (alpha !== 0 && !shiftDown) {
            cos = Math.cos(alpha);
            sin = Math.sin(alpha);
            var na = [[1, 0, 0, 0], [0, cos, -sin, 0], [0, sin, cos, 0], [0, 0, 0, 1]];
            matrixMult(na);
        }
        if (beta !== 0 && !shiftDown) {
            cos = Math.cos(beta);
            sin = Math.sin(beta);
            var nb = [[cos, 0, sin, 0], [0, 1, 0, 0], [-sin, 0, cos, 0], [0, 0, 0, 1]];
            matrixMult(nb);
        }
        if (shiftDown) {
            var ns = [[1 + scale, 0, 0, 0], [0, 1 + scale, 0, 0], [0, 0, 1 + scale, 0],
                [0, 0, 0, 1]];
            matrixMult(ns);
        }
        matrixOld = matrix;
        matrixMult(MATRIX_PROJ);
        projection();
        setMatrix(matrixOld);
    }

    const matrixMult = (otherMatrix) => {
        var M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    M[i][j] += this.matrix[k][j] * otherMatrix[i][k];
                }
            }
        }
        setMatrix(M);
    };
    const {userInput} = useContext(InputAreaContext)
    const update3d = () => {
        try {
            setMatrix3D();
            sumbitToCalc(sectionId, userInput)
            setImagePath(getImageUrl(sectionId))
            document.getElementById('graph-additional-img').attr('src', getImageUrl(sectionId))
        } catch (e) {
        }
    }

    function getImageUrl(sectionId, frame) {
        return ('http://localhost:8080/servlet/image?section_number='
            + sectionId
            + (frame ? '&frame=' + frame : '')
            + '&timestamp=' + new Date().getTime()
        );
    }

    return (
        <div>
            <canvas
                className="plot3d"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </div>

    );
}

export default Mathpar3D;