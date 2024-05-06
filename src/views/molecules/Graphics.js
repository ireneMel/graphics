import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import $ from 'jquery';
//import { getSpaceParameters } from 'sidebar';
import _ from 'lodash'; // Assuming you're using lodash
import 'bootstrap-slider';

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

    useEffect(() => {
        if (response === "") return;
        initData();
        init();
    }, [response]);

    const initData = () => {
        let task = response.task;
        if (!response.task || response.task === "") return;

        setSectionId(0);
        setIsGraph(containsGraphCommand(task));
        setIsTablePlot(containsTableplotCommand(task));
        setIsPlot3d(task.indexOf('\\plot3d') >= 0 || task.indexOf('\\paramPlot3d') >= 0);
        setIsPlot3dImplicit(task.indexOf('\\implicitPlot3d') >= 0);
        setIsPlot3dExplicit(task.indexOf('\\explicitPlot3d') >= 0);
        setIsPlot3dCollection(task.indexOf('\\showPlots3D') >= 0);
        setIsPlot3dCollectionIntersection(task.indexOf('\\intersection3D') >= 0);
        if (isPlot3dCollectionIntersection) {
            // task = task.replace('\\intersection3D', '\\showPlots3D');
            setIsPlot3dCollection(true);
        }
        setIsPlot3dParametric(task.indexOf('\\parametricPlot3d') >= 0);
        setIsRenderMultipleSurfaces(task.indexOf('\\show3d') >= 0);
        setImgPath(isGraph || isTablePlot ? getImageUrl(0) : '');
        setImgPath(getImageUrl(0))
        setOldParameters([]);
        setOldSettings(DEFAULT_SETTINGS);
        setParameters([]);
        setSettings([]);
        //setRingParameters(getSpaceParameters(isPlot3d || isPlot3dImplicit || isPlot3dExplicit || isPlot3dParametric || isPlot3dCollection || isPlot3dCollectionIntersection || isRenderMultipleSurfaces));
        setParamSettingsChanged(false);
        setEl(document.querySelector(`#section_${0} .graph-additional`));
    };

    const init = () => {
        const withParameters = !isTablePlot && ringParameters.length > 0;

        if (!(isGraph || isPlot3d || isPlot3dImplicit || isPlot3dExplicit || isPlot3dParametric || isTablePlot || isPlot3dCollection || isPlot3dCollectionIntersection || isRenderMultipleSurfaces)) {
            return;
        }

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
            // Assuming you have a resize handler function
            $(window).trigger('resize')
        });

        // Assuming you have a function to initialize 3D stuff
        // if (isPlot3d) {
        //     props.init3d();
        // }

        // graphImgRef.current.classList.remove('threed');

        // Assuming you have functions to initialize different types of plots
        // if (isPlot3dImplicit && !isPlot3dCollection) {
        //     props.initPlot3dImplicit();
        // }
        // if (isPlot3dExplicit && !isRenderMultipleSurfaces && !isPlot3dCollection) {
        //     props.initPlot3dExplicit();
        // }
        // if (isPlot3dParametric && !isRenderMultipleSurfaces && !isPlot3dCollection) {
        //     props.initPlot3dParametric();
        // }
        // if (isPlot3dCollection && !isRenderMultipleSurfaces) {
        //     props.initPlot3dCollection();
        // }
        // if (isRenderMultipleSurfaces) {
        //     props.initRenderMultipleSurfaces();
        // }
    };

    function url(path) {
        var localeStr = '';
        // if (locale) {
        //     localeStr = ((path.indexOf('?') >= 0) ? '&' : '?') + 'locale=' + locale;
        // }
        return ((path.charAt(0) === '/') ? path : '/' + path) + localeStr;
    }

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
    const graphImgRef = useRef();
    useEffect(() => {
        console.log('ImagePath', imgPath)
    }, [imgPath])


    return (
        <div ref={elRef} className="graph-additional">
            <div className="frames-number">
                <input type="number" value={framesNumber} onChange={e => setFramesNumber(e.target.value)}/>
            </div>
            <img src={imgPath} alt="Graph" className="graph-additional-img"/>
            <button onClick={_handleBtnDownload}>Download</button>
            {/* Rest of your component... */}
        </div>
    );
}

export default Graphics;