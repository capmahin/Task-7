// Product Configurator JavaScript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the 3D scene
    initScene();
    
    // Set up event listeners for UI controls
    setupEventListeners();
    
    // Update the summary text
    updateSummary();
});

// Global variables
let scene, camera, renderer, chair, logo, cushion;
let currentColor = '#2c3e50';
let logoVisible = true;
let cushionVisible = true;

function initScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(document.getElementById('product-viewer').offsetWidth, 
                     document.getElementById('product-viewer').offsetHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('product-viewer').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Create chair
    createChair();
    
    // Add orbit controls for camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function createChair() {
    // Chair group
    chair = new THREE.Group();
    
    // Chair base (legs and frame)
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 3);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: currentColor });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.1;
    base.castShadow = true;
    base.receiveShadow = true;
    chair.add(base);
    
    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
    const legMaterial = new THREE.MeshStandardMaterial({ color: currentColor });
    
    const legPositions = [
        [1.2, -1, 1.2],
        [-1.2, -1, 1.2],
        [1.2, -1, -1.2],
        [-1.2, -1, -1.2]
    ];
    
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        leg.receiveShadow = true;
        chair.add(leg);
    });
    
    // Chair back
    const backGeometry = new THREE.BoxGeometry(2.5, 4, 0.2);
    const backMaterial = new THREE.MeshStandardMaterial({ color: currentColor });
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.set(0, 2.2, -1.2);
    back.castShadow = true;
    back.receiveShadow = true;
    chair.add(back);
    
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(2.8, 0.2, 2.8);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: currentColor });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 1, 0);
    seat.castShadow = true;
    seat.receiveShadow = true;
    chair.add(seat);
    
    // Create logo
    createLogo();
    
    // Create cushion
    createCushion();
    
    scene.add(chair);
}

function createLogo() {
    // Logo geometry (simple star shape)
    const logoGeometry = new THREE.RingGeometry(0.3, 0.5, 6);
    const logoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf1c40f,
        side: THREE.DoubleSide
    });
    
    logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 2.5, -1.1);
    logo.rotation.x = Math.PI / 2;
    logo.castShadow = true;
    
    chair.add(logo);
}

function createCushion() {
    // Cushion geometry
    const cushionGeometry = new THREE.BoxGeometry(2.5, 0.4, 2.5);
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3498db,
        roughness: 0.8
    });
    
    cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.position.set(0, 1.2, 0);
    cushion.castShadow = true;
    cushion.receiveShadow = true;
    
    chair.add(cushion);
}

function setupEventListeners() {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get the color value
            const newColor = this.getAttribute('data-color');
            currentColor = newColor;
            
            // Update chair color with animation
            updateChairColor(newColor);
            
            // Update summary
            updateSummary();
        });
    });
    
    // Logo toggle
    const logoToggle = document.getElementById('logo-toggle');
    logoToggle.addEventListener('change', function() {
        logoVisible = this.checked;
        toggleLogo(logoVisible);
        updateSummary();
    });
    
    // Cushion toggle
    const cushionToggle = document.getElementById('cushion-toggle');
    cushionToggle.addEventListener('change', function() {
        cushionVisible = this.checked;
        toggleCushion(cushionVisible);
        updateSummary();
    });
}

function updateChairColor(color) {
    // Animate color change with GSAP
    const hexColor = parseInt(color.replace('#', '0x'));
    
    // Get all chair parts that should change color
    const chairParts = chair.children.filter(child => {
        return child !== logo && child !== cushion;
    });
    
    // Animate color transition
    chairParts.forEach(part => {
        if (part.material && part.material.color) {
            gsap.to(part.material.color, {
                r: ((hexColor >> 16) & 255) / 255,
                g: ((hexColor >> 8) & 255) / 255,
                b: (hexColor & 255) / 255,
                duration: 0.5
            });
        }
    });
}

function toggleLogo(visible) {
    // Animate logo visibility
    if (visible) {
        gsap.to(logo.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        gsap.to(logo.position, { z: -1.1, duration: 0.3 });
    } else {
        gsap.to(logo.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
        gsap.to(logo.position, { z: -1.5, duration: 0.3 });
    }
}

function toggleCushion(visible) {
    // Animate cushion visibility
    if (visible) {
        gsap.to(cushion.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        gsap.to(cushion.position, { y: 1.2, duration: 0.3 });
    } else {
        gsap.to(cushion.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
        gsap.to(cushion.position, { y: 0.8, duration: 0.3 });
    }
}

function updateSummary() {
    // Get color name based on hex value
    let colorName = "Dark Blue";
    switch(currentColor) {
        case '#2c3e50': colorName = "Dark Blue"; break;
        case '#e74c3c': colorName = "Red"; break;
        case '#2ecc71': colorName = "Green"; break;
        case '#f1c40f': colorName = "Yellow"; break;
        case '#9b59b6': colorName = "Purple"; break;
        case '#1abc9c': colorName = "Teal"; break;
    }
    
    // Update summary text
    const summaryText = document.getElementById('summary-text');
    summaryText.textContent = `Color: ${colorName} | Logo: ${logoVisible ? 'On' : 'Off'} | Cushion: ${cushionVisible ? 'On' : 'Off'}`;
}

function onWindowResize() {
    camera.aspect = document.getElementById('product-viewer').offsetWidth / 
                    document.getElementById('product-viewer').offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('product-viewer').offsetWidth, 
                     document.getElementById('product-viewer').offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate chair slowly
    if (chair) {
        chair.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}