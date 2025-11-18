# Chair Configurator - Three.js Interactive 3D Product Demo

An interactive 3D chair configurator built with Three.js and Vite. This project demonstrates how to create engaging product visualization experiences on the web with real-time customization options.

## Features

- **Interactive 3D Visualization**: Real-time 3D rendering of a chair model using Three.js
- **Color Customization**: Choose from 6 different color options for the chair
- **Component Toggles**: Show/hide logo and premium cushion components
- **Real-time Updates**: Instant visual feedback when changing configurations
- **Smooth Animations**: Color transitions and component show/hide animations powered by GSAP
- **Responsive Design**: Works on desktop and mobile devices
- **Camera Controls**: Orbit controls for 360-degree viewing of the product
- **Dynamic Summary**: Real-time text summary of current configuration

## Technical Implementation Details

- **Core 3D Engine**: Three.js for WebGL-based 3D rendering
- **Build Tool**: Vite for fast development and production builds
- **Animation Library**: GSAP for smooth UI and 3D animations
- **UI Framework**: Vanilla JavaScript with modern ES6 modules
- **Responsive Layout**: CSS Flexbox and media queries for cross-device compatibility
- **Real-time Rendering**: Continuous animation loop for smooth 3D updates
- **Modular Architecture**: Well-organized code structure separating concerns

## 3D Model Components

- **Chair Base**: Sturdy foundation with four cylindrical legs
- **Seat**: Comfortable seating surface with optional cushion
- **Backrest**: Tall back support structure
- **Branded Logo**: Decorative ring-shaped logo element
- **Premium Cushion**: Optional blue cushion for enhanced comfort appearance
- **Lighting System**: Ambient and directional lighting for realistic shadows

## User Interface Elements

- **Color Picker**: Visual color selection with active state indicators
- **Toggle Switches**: Intuitive on/off controls for optional components
- **Configuration Summary**: Text display showing current settings
- **Responsive Layout**: Adapts to different screen sizes
- **Header & Footer**: Professional branding and copyright information

## How It Works

- **Scene Initialization**: Creates Three.js scene, camera, and renderer
- **Model Construction**: Dynamically builds chair geometry using primitive shapes
- **Event Handling**: Listens for UI interactions to trigger updates
- **Color Management**: Converts hex colors to Three.js compatible values
- **Component Visibility**: Uses GSAP to animate show/hide transitions
- **Continuous Animation**: Slow rotation effect for better product viewing
- **Responsive Updates**: Adjusts to window resizing events

## Prerequisites

Before you start, make sure you have Node.js installed on your machine: (https://nodejs.org/en/download/)

## Installation

Once you've cloned or downloaded this project file to your local machine, navigate to this project directory in your terminal.

Run the following command to install the necessary dependencies:

```bash
npm install
```

## Running the project

To start the development server, run the following command:

```bash
npm run dev
```

This will start the server and open your default browser to your localhost. The site will reload automatically as you make changes to your code.

## Building for Production

To create a production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── index.html          # Main HTML file with UI layout
│   ├── script.js           # Three.js 3D logic and interactivity
│   └── style.css           # Additional styling
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Dependencies

- **three**: ^0.168.0 - Core 3D library
- **gsap**: ^3.13.0 - Animation library
- **vite**: ^5.4.6 - Build tool and development server