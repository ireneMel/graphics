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
    const [oldParameters, setOldParameters] = useState([]);
    const [oldSettings, setOldSettings] = useState(DEFAULT_SETTINGS); // Assuming DEFAULT_SETTINGS is defined somewhere
    const [parameters, setParameters] = useState([]);
    const [settings, setSettings] = useState([]);
    const [ringParameters, setRingParameters] = useState([]);
    const [paramSettingsChanged, setParamSettingsChanged] = useState(false);
    const [el, setEl] = useState(null);
    const elRef = useRef(null);
    const [framesNumber, setFramesNumber] = useState(0);
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
        setOldParameters([]);
        setOldSettings(DEFAULT_SETTINGS);
        setParameters([]);
        setSettings([]);
        //setRingParameters(getSpaceParameters(isPlot3d || isPlot3dImplicit || isPlot3dExplicit || isPlot3dParametric || isPlot3dCollection || isPlot3dCollectionIntersection || isRenderMultipleSurfaces));
        setParamSettingsChanged(false);
        setEl(document.querySelector(`#section_${0} .graph-additional`));


        return !(
            (isPlot3dImplicitTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dExplicitTmp && !isRenderMultipleSurfacesTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dParametricTmp && !isRenderMultipleSurfacesTmp && !isPlot3dCollectionTmp) ||
            (isPlot3dCollectionTmp && !isRenderMultipleSurfacesTmp)
        );
    };

    const [key, setKey] = useState(0);
    const init = (showImg) => {
        const withParameters = !isTablePlot && ringParameters.length > 0;

        setShowImage(showImg)

        if (showImg) {
            setKey(prevKey => prevKey + 1);
            return;
        }

        // if (!(isGraph || isPlot3d || isPlot3dImplicit || isPlot3dExplicit || isPlot3dParametric || isTablePlot || isPlot3dCollection || isPlot3dCollectionIntersection || isRenderMultipleSurfaces)) {
        //     return;
        // }

        // Assuming graphAddonsTpl is a function that returns a string of HTML
        const graphAddonsTplData = {
            //msg: props.msg,
            imgPath,
            withParameters,
            ringParameters,
            isTablePlot
        };

        elRef.current.src = imgPath;
        //elRef.current.innerHTML = props.graphAddonsTpl(graphAddonsTplData);
        //const replotBtn = $(elRef.current).find('.btn-replot');
        //parametersButtonsRef.current = $(elRef.current).find('.parameters');
        //sliderRef.current = $(elRef.current).find('.parameter-slider');

        //$(elRef.current).on('click', '.btn-download', _handleBtnDownload);
        // if (!isTablePlot) {
        //     replotBtn.on('click', props._handleBtnReplotNonTableplot);
        // }

        // if (withParameters) {
        //     parametersButtonsRef.current.find('.btn.active').removeClass('active');
        //     parametersButtonsRef.current.find('.btn').eq(0).addClass('active');
        //     parametersButtonsRef.current.find('input[name="parameters"]').on('change', function () {
        //         sliderRef.current.slider('setValue', parseFloat($(this).siblings('.val').text()));
        //     });
        //     _.defer(function () {
        //         sliderRef.current.slider({min: 0, max: 1, step: 0.01, value: 1, tooltip: 'hide'});
        //         sliderRef.current.on('slide', function (ev) {
        //             parametersButtonsRef.current.find('.btn.active').find('.val').text(ev.value.toFixed(2));
        //         });
        //     });
        // }
        //
        // if (isTablePlot) {
        //     props.tablePlotUi.init();
        //     props.tablePlotUi.appendCanvasTo(graphImgRef.current);
        // }

        $(window).on('resize', function () {
            $(window).trigger('resize')
        });

        document.querySelectorAll("canvas").forEach((canvas) => {
            canvas.remove();
        });

        setKey(prevKey => prevKey + 1); // This will trigger a re-render

        // if (isPlot3dCollection && !isRenderMultipleSurfaces) {
        //     props.initPlot3dCollection();
        // }
        // if (isRenderMultipleSurfaces) {
        //     props.initRenderMultipleSurfaces();
        // }
    };

    const _handleBtnDownload = (ev) => {
        ev.preventDefault();
        //const framesNumber = parseInt($(elRef.current).find('.frames-number input').val(), 10);
        if (framesNumber > 1) {
            for (let i = 0; i < framesNumber; i++) {
                window.open(getImageUrl(response.sectionId, i) + '&download=true');
            }
        } else {
            window.open(response.imgPath + '&download=true');
        }
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

    useEffect(() => {
        console.log('ImagePath', imgPath)
    }, [imgPath])


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