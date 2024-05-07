import React, {useContext, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import $ from 'jquery';
import {fetchPlot3DImplicit} from "../../api/apiClient3D";
import InputAreaContext from "../../context/InputAreaContext";
// import "../../styles"

const Plot3dImplicit = ({sectionId}) => {
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

    function init() {
        if (document.querySelectorAll('canvas').length > 0) return;
        const container = $(containerRef.current);
        container.addClass('threed');

        // CAMERA
        const SCREEN_WIDTH = container.parent().width();
        const SCREEN_HEIGHT = container.parent().width() * 0.75;
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

        // CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);

        const $canvas = $(renderer.domElement);
        $canvas.addClass('plot3d-implicit');
        $canvas.width(700);
        $canvas.height(500);
        $canvas.insertAfter(container);

        let geometry = new THREE.BufferGeometry();

        try {
            fetchPlot3DImplicit(sectionId, userInput).then((geom) => {
                const axesSize = 1.2 * Math.max(geom[0][0], geom[0][1], geom[0][2]);
                const axisHelper = new THREE.AxesHelper(axesSize);
                scene.add(axisHelper);

                // Assuming createAxisLabel is a function that creates a label for an axis
                const xLabel = createAxisLabel('x', new THREE.Vector3(axesSize, 0, 0), camera.rotation);
                const yLabel = createAxisLabel('y', new THREE.Vector3(0, axesSize, 0), camera.rotation);
                const zLabel = createAxisLabel('z', new THREE.Vector3(0, 0, axesSize), camera.rotation);
                scene.add(xLabel);
                scene.add(yLabel);
                scene.add(zLabel);

                // LIGHT
                // const light = new THREE.PointLight(0xffffff, 1.2);
                // light.position.set(10, 12, 0);
                // scene.add(light);

                // Assuming toVector3 is a function that converts geom[i] to a Vector3
                const vertices = geom.slice(1).map(toVector3);
                const indices = [];
                for (let i = 2; i < vertices.length; i += 3) {
                    indices.push(i - 2, i - 1, i);
                }
                geometry.setFromPoints(vertices);
                geometry.setIndex(indices);
                geometry.computeVertexNormals();

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
            });

        } catch (e) {
            alert('Error loading mesh for implicit 3D plot.');
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
        // const shapes = font.generateShapes(text, 1);
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

    return <div ref={containerRef}/>;
};

export default Plot3dImplicit;