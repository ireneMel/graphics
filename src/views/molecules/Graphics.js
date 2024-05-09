import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery';
import 'bootstrap-slider';
import Plot3D from "./Plot3d";
import {Plot3DType} from "../../utils/enums";

function Graphics({response}) {
    const DEFAULT_SETTINGS = [false, 3, 3, 1];
    const [sectionId, setSectionId] = useState(null);
    const [isGraph, setIsGraph] = useState(false);
    const [isTablePlot, setIsTablePlot] = useState(false);
    const [isPlot3d, setIsPlot3d] = useState(false);
    const [isPlot3dImplicit, setIsPlot3dImplicit] = useState(false);
    const [isPlot3dExplicit, setIsPlot3dExplicit] = useState(false);
    const [isPlot3dCollection, setIsPlot3dCollection] = useState(false);
    const [isPlot3dCollectionIntersection, setIsPlot3dCollectionIntersection] = useState(false);
    const [isPlot3dParametric, setIsPlot3dParametric] = useState(false);
    const [isRenderMultipleSurfaces, setIsRenderMultipleSurfaces] = useState(false);
    const [imgPath, setImgPath] = useState('');
    const elRef = useRef(null)
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (response === "") return;
        let showImg = initData();
        init(showImg);
    }, [response]);

    const initData = () => {
        let task = response.task;
        if (!response.task || response.task === "") return;

        setSectionId(response.sectionId);
        setIsGraph(containsGraphCommand(task));
        setIsTablePlot(containsTableplotCommand(task));

        let isTablePlot3dTmp = task.indexOf('\\plot3d') >= 0 || task.indexOf('\\paramPlot3d') >= 0,
            isPlot3dImplicitTmp = task.indexOf('\\implicitPlot3d') >= 0,
            isPlot3dExplicitTmp = task.indexOf('\\explicitPlot3d') >= 0,
            isPlot3dCollectionTmp = task.indexOf('\\showPlots3D') >= 0,
            isPlot3dCollectionIntersectionTmp = task.indexOf('\\intersection3D') >= 0,
            isPlot3dParametricTmp = task.indexOf('\\parametricPlot3d') >= 0,
            isRenderMultipleSurfacesTmp = task.indexOf('\\show3d') >= 0
        setIsPlot3d(isTablePlot3dTmp);
        setIsPlot3dImplicit(isPlot3dImplicitTmp);
        setIsPlot3dExplicit(isPlot3dExplicitTmp);
        setIsPlot3dCollection(isPlot3dCollectionTmp);
        setIsPlot3dCollectionIntersection(isPlot3dCollectionIntersectionTmp);
        if (isPlot3dCollectionIntersection) {
            task = task.replace('\\intersection3D', '\\showPlots3D');
            setIsPlot3dCollection(true);
        }
        setIsPlot3dParametric(isPlot3dParametricTmp);
        setIsRenderMultipleSurfaces(isRenderMultipleSurfacesTmp);
        setImgPath(isGraph || isTablePlot ? getImageUrl(0) : '');
        setImgPath(getImageUrl(0))

        return !(
            (isPlot3dImplicitTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dExplicitTmp && !isRenderMultipleSurfacesTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dParametricTmp && !isRenderMultipleSurfacesTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dCollectionTmp && !isRenderMultipleSurfacesTmp)
        );
    };

    const [key, setKey] = useState(0);
    const init = (showImg) => {
        setShowImage(showImg)

        if (showImg) {
            setKey(prevKey => prevKey + 1);
            return;
        }

        elRef.current.src = imgPath;
        $(window).on('resize', function () {
            $(window).trigger('resize')
        });
        document.querySelectorAll("canvas").forEach((canvas) => {
            canvas.remove();
        });
        setKey(prevKey => prevKey + 1); // This will trigger a re-render
    };

    const _handleBtnDownload = (ev) => {
        ev.preventDefault();
        //TODO - implement
    };

    //TODO - move to util
    function getImageUrl(sectionId, frame) {
        return ('http://localhost:8080/servlet/image?section_number='
            + sectionId
            + (frame ? '&frame=' + frame : '')
            + '&timestamp=' + new Date().getTime() // Don't cache ever!
        );
    }

    function containsGraphCommand(task) {
        return task.indexOf('\\plot') >= 0
            || task.indexOf('\\textPlot') >= 0
            || task.indexOf('\\paramPlot') >= 0
            || task.indexOf('\\plotGraph') >= 0
            || task.indexOf('\\showPlots') >= 0
            || task.indexOf('\\paintElement') >= 0
            || task.indexOf('\\pointsPlot') >= 0
            || task.indexOf('\\arrowPlot') >= 0;
    }

    function containsTableplotCommand(task) {
        return task.indexOf('\\tablePlot') >= 0
            && task.indexOf('\\showPlots') < 0
            && task.indexOf('\\tablePlot2') < 0
            && task.indexOf('\\tablePlot4') < 0;
    }

    const getCommonSettings = () => {

    }

    const handleBtnReplotNonTableplot = () => {

    }

    const loadFrames = () => {

    }

    const animate = () => {

    }

    const okNonTableplotReplot = () => {

    }

    const _handleBtnReplotClickTableplot = () => {

    }

    const _areGraphParametersChanged = () => {

    }


    return (
        <div ref={elRef} key={key}>
            {showImage && <img src={imgPath} alt="Graph" style={{width: '100%', height: '100%'}}
                               className="graph-additional-img"/>}
            {/*<button onClick={_handleBtnDownload}>Download</button>*/}
            {/*{isTablePlot && <TablePlotUI/>}*/}
            {/*{isPlot3d && <Mathpar3D sectionId={sectionId}/>}*/}
            {(isPlot3dImplicit && !isPlot3dCollection) && <Plot3D sectionId={sectionId} type={Plot3DType.IMPLICIT}/>}
            {(isPlot3dExplicit && !isRenderMultipleSurfaces && !isPlot3dCollection) &&
                <Plot3D sectionId={sectionId} type={Plot3DType.EXPLICIT}/>}
            {(isPlot3dParametric && !isRenderMultipleSurfaces && !isPlot3dCollection) &&
                <Plot3D sectionId={sectionId} type={Plot3DType.PARAMETRIC}/>}

        </div>
    );
}

export default Graphics;