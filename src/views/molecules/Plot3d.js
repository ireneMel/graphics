import React, {useContext, useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import $ from 'jquery';
import {fetchPlot3DExplicit, fetchPlot3DImplicit, fetchPlot3DParametric, fetchShowplots3d} from "../../api/apiClient3D";
import InputAreaContext from "../../context/InputAreaContext";
import {Plot3DType} from "../../utils/enums";

const Plot3d = ({sectionId, type}) => {
    const containerRef = useRef();
    const {userInput} = useContext(InputAreaContext)
    const scene = new THREE.Scene();

    useEffect(() => {
        init();
    }, [sectionId]);

    //TODO: put in utils class
    function toVector3(geom) {
        return new THREE.Vector3(geom[0], geom[1], geom[2]);
    }

    const fetchFunctions = {
        [Plot3DType.IMPLICIT]: fetchPlot3DImplicit,
        [Plot3DType.EXPLICIT]: fetchPlot3DExplicit,
        [Plot3DType.PARAMETRIC]: fetchPlot3DParametric,
        [Plot3DType.SHOWPLOTS]: fetchShowplots3d
    };

    function init() {
        if (document.querySelectorAll('canvas').length > 0) return;
        const container = $(containerRef.current);

        const SCREEN_WIDTH = container.parent().width();
        const SCREEN_HEIGHT = container.parent().width() * 0.55;
        const VIEW_ANGLE = 45;
        const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
        const NEAR = 0.1;
        const FAR = 20000;
        const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(camera);
        camera.position.set(20, 20, 10);
        camera.up = new THREE.Vector3(0, 0, 1);
        camera.lookAt(scene.position);

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.setClearColor(0x000000, 0);

        const $canvas = $(renderer.domElement);
        $canvas.addClass('plot3d');
        $canvas.css('background-color', '#fafafa');
        $canvas.insertAfter(container);

        try {
            if (fetchFunctions[type]) {
                fetchFunctions[type](sectionId, userInput).then((geom) => {
                    callBack(geom, camera, renderer);
                });
            }
        } catch (e) {
            alert('Error loading mesh for 3D plot.');
        }
    }

    function render(renderer, camera) {
        if (!scene || !camera) return;
        renderer.render(scene, camera)
    }

    function animate(renderer, camera, controls, xLabel, yLabel, zLabel) {
        requestAnimationFrame(() => animate(renderer, camera, controls, xLabel, yLabel, zLabel));
        render(renderer, camera);
        update(controls, camera, xLabel, yLabel, zLabel)
    }

    function update(controls, camera, xLabel, yLabel, zLabel) {
        if (!controls) return;
        controls.update();
        xLabel.setRotationFromEuler(camera.rotation);
        yLabel.setRotationFromEuler(camera.rotation);
        zLabel.setRotationFromEuler(camera.rotation);
    }

    function createAxisLabel(text, position, rotation) {
        var textGeom, textMaterial, textMesh;
        textGeom = new THREE.BoxGeometry(text, {
            size: 1,
            height: 0.2,
            curveSegments: 6,
            font: "helvetiker"
        });
        textMaterial = new THREE.MeshBasicMaterial({color: "#ffd966"});
        textMesh = new THREE.Mesh(textGeom, textMaterial);
        textMesh.position.x = position.x;
        textMesh.position.y = position.y;
        textMesh.position.z = position.z;
        textMesh.setRotationFromEuler(rotation);
        return textMesh;
    }

    function callBack(geom, camera, renderer) {
        let geometry = new THREE.BufferGeometry();
        const controls = new OrbitControls(camera, renderer.domElement);
        const axesSize = 1.2 * Math.max(geom[0][0], geom[0][1], geom[0][2]);
        const axisHelper = new THREE.AxesHelper(axesSize);
        const stacks = geom[0][6];
        scene.add(axisHelper);

        const xLabel = createAxisLabel('x', new THREE.Vector3(axesSize, 0, 0), camera.rotation);
        const yLabel = createAxisLabel('y', new THREE.Vector3(0, axesSize, 0), camera.rotation);
        const zLabel = createAxisLabel('z', new THREE.Vector3(0, 0, axesSize), camera.rotation);
        scene.add(xLabel);
        scene.add(yLabel);
        scene.add(zLabel);


        if (type === Plot3DType.IMPLICIT) {
            const vertices = geom.slice(1).map(toVector3);
            setupGeometryImplicit(vertices, geometry);
        } else if (type === Plot3DType.EXPLICIT || type === Plot3DType.PARAMETRIC) {
            const vertices = geom.slice(1).map(toVector3);
            setupGeometryExplicit(vertices, geometry, stacks)
        } else if (type === Plot3DType.SHOWPLOTS) {
            //TODO: implement logic
            // setupShowPlots
        }

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const pointLight = new THREE.DirectionalLight(0xffffff, 1.5);
        pointLight.position.set(10, 12, 0);
        scene.add(pointLight);

        const colorMaterial = new THREE.MeshStandardMaterial({
            color: '#' + Math.floor(Math.random() * 8388607 + 8388608).toString(16),
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, colorMaterial);
        scene.add(mesh);

        render(renderer, camera);
        animate(renderer, camera, controls, xLabel, yLabel, zLabel);
    }

    function setupGeometryImplicit(vertices, geometry) {
        const indices = [];
        for (let i = 2; i < vertices.length; i += 3) {
            indices.push(i - 2, i - 1, i);
        }
        geometry.setFromPoints(vertices);
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
    }

    function setupGeometryExplicit(vertices, geometry, stacks) {
        let a, b, c, d;
        let sliceCount = stacks + 1;
        const indices = [];

        for (let i = 0; i < stacks; i++) {
            for (let j = 0; j < stacks; j++) {
                a = i * sliceCount + j;
                b = i * sliceCount + j + 1;
                c = (i + 1) * sliceCount + j + 1;
                d = (i + 1) * sliceCount + j;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        geometry.setFromPoints(vertices);
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
    }

    return <div ref={containerRef}/>;
};

export default Plot3d;