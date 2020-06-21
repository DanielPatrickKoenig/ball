<template>
    <div>
        <div class='three-container' :id="containerID"></div>
        <div class="tracker" v-on:click="clicked" v-on:mousedown="down"></div>
        <div v-if="pedalDown" v-on:mouseup="up" v-on:mousemove="move" class="cover"></div>
    </div>
</template>
<script>
import ShapeMaker from '../objects/ShapeMaker.js';
import jstrig from 'jstrig';
import ShapeManifest from '../objects/ShapeManifest.js';
export default {
    data () {
        return {
            containerID: 'id-' + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join(''),
            THREE: {},
            CANNON: {},
            deltaTime: 0,
            totalTime: 0,
            easePosition: {x: 0, y: 0, _x: 0, _y: 0, ease: 10},
            shapeMaker: {},
            mirrorMaker: {},
            mirrorStats:[],
            hasFloor: false,
            segmentSize: {x: 4, y: 4, z: 12},
            maxSpeed: -40,
            minSpeed: 20,
            segmentAdvance: 10,
            pedalDown: false,
            segmentsPlaced: [],
            segmentGroups: {}
        }
    },
    methods: {
        clicked: function () {
            // this.$data.shapeMaker.getShapes()[0].body.velocity.set(0,0,-20);
        },
        move: function (e) {
            let mousePos = {x: e.pageX, y: e.pageY};
            let pos = {x: mousePos.x - 250, y: mousePos.y - 100};
            this.$data.easePosition._x = pos.x;
            this.$data.easePosition._y = pos.y;
            
        },
        up: function () {
            this.$data.pedalDown = false;
        },
        down: function () {
            this.$data.pedalDown = true;
        },
        addMirrorBlock: function (position, size) {
            let self = this;
            let shape = self.$data.mirrorMaker.createShape(self.$data.mirrorMaker.getShapeTypes().Cube, position,[size.width,size.height,size.depth],0);
            self.$data.mirrorStats.push({dist: jstrig.distance({x: 0, y: 0}, {x: position.x, y: position.y}), angle: jstrig.angle({x: 0, y: 0}, {x: position.x, y: position.y})});
            return shape;
        },
        addTrackSegment: function (zSlot, leftBorder, rightBorder) {
            let self = this;
            let slotId = '-' + zSlot.toString() + '-';
            if(self.$data.segmentsPlaced.join('').split(slotId).length <= 1) {
                let zPosition = (2 + (zSlot * self.$data.segmentSize.z)) * -1;
                self.$data.segmentsPlaced.push(slotId);
                self.$data.segmentGroups[slotId] = [];
                let predefinedShapes = ShapeManifest.getShapeByIndex(zSlot);
                if (predefinedShapes){
                    for(let i = 0; i < predefinedShapes.length; i++) {
                        self.$data.segmentGroups[slotId].push(self.addMirrorBlock(
                            {
                                x:predefinedShapes[i].position.x*self.$data.segmentSize.x,
                                y:predefinedShapes[i].position.y*self.$data.segmentSize.y,
                                z:zPosition + (predefinedShapes[i].position.z*self.$data.segmentSize.z)
                            }, {
                                width: predefinedShapes[i].size.width*self.$data.segmentSize.x,
                                height: predefinedShapes[i].size.height*self.$data.segmentSize.y,
                                depth: predefinedShapes[i].size.depth*self.$data.segmentSize.z
                            }));
                    }
                    
                }
                else{
                    self.$data.segmentGroups[slotId].push(self.addMirrorBlock({x:0,y:0,z: zPosition}, {width: self.$data.segmentSize.x, height: .05 * self.$data.segmentSize.y, depth: self.$data.segmentSize.z}));
                    if(rightBorder){
                        self.$data.segmentGroups[slotId].push(self.addMirrorBlock({x:1.5,y:0,z: zPosition}, {width: .05 * self.$data.segmentSize.x, height: .15 * self.$data.segmentSize.y, depth: self.$data.segmentSize.z}));
                    }
                    if (leftBorder){
                        self.$data.segmentGroups[slotId].push(self.addMirrorBlock({x:-1.5,y:0,z: zPosition}, {width: .05 * self.$data.segmentSize.x, height: .15 * self.$data.segmentSize.y, depth: self.$data.segmentSize.z}));
                    }   
                }
                
            }
        },
        removeTrackSegment: function (zSlot) {
            let self = this;
            let slotId = '-' + zSlot.toString() + '-';
            if(self.$data.segmentGroups[slotId] != undefined && self.$data.segmentGroups[slotId] != 'gone'){
                for(let i = 0; i < self.$data.segmentGroups[slotId].length; i++){
                    self.$data.mirrorMaker.getScene().remove(self.$data.segmentGroups[slotId][i].mesh);
                    self.$data.mirrorMaker.getWorld().remove(self.$data.segmentGroups[slotId][i].body);
                }
            }
            self.$data.segmentGroups[slotId] = 'gone';
        }
    },
    mounted: function () {
        let self = this;
        this.$data.THREE = require('three');
        this.$data.CANNON = require('cannon');
        
        var _width = document.getElementById(self.$data.containerID).getBoundingClientRect().width;
        var _height = document.getElementById(self.$data.containerID).getBoundingClientRect().height;
        var containerElement = document.getElementById(self.$data.containerID);
        self.$data.renderer = new self.$data.THREE.WebGLRenderer({alpha: true});
        // self.$data.renderer = new self.$data.THREE.WebGLRenderer()
        self.$data.renderer.setSize(_width, _height);
        containerElement.appendChild(self.$data.renderer.domElement);
        self.$data.scene = new self.$data.THREE.Scene();
        self.$data.camera = new self.$data.THREE.PerspectiveCamera(75, _width / _height, 1, 1000);
        self.$data.camera.position.x = 0;
        self.$data.camera.position.y = 2;
        self.$data.camera.position.z = 0;
        self.$data.camera.rotation.x = -.15;
        
        var clock = new self.$data.THREE.Clock();

        var world = new self.$data.CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        var solver = new self.$data.CANNON.GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;
        var split = true;
        if(split)
            world.solver = new self.$data.CANNON.SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0,-100,0);
        world.broadphase = new self.$data.CANNON.NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        var physicsMaterial = new self.$data.CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new self.$data.CANNON.ContactMaterial(physicsMaterial,
                                                                physicsMaterial,
                                                                0.0, // friction coefficient
                                                                0.3  // restitution
                                                                );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        // createSphere(0,1.5,0, mass);
        // createSphere(.25,2.2,0, mass);

        if(self.$data.hasFloor){
            var groundShape = new self.$data.CANNON.Plane();
            var groundBody = new self.$data.CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.quaternion.setFromAxisAngle(new self.$data.CANNON.Vec3(1,0,0),-Math.PI/2);
            world.addBody(groundBody);
        }
        self.$data.shapeMaker = new ShapeMaker(this.$data.THREE, this.$data.CANNON);
        self.$data.shapeMaker.setScene(self.$data.scene);
        self.$data.shapeMaker.setWorld(world);

        self.$data.mirrorMaker = new ShapeMaker(this.$data.THREE, this.$data.CANNON);
        self.$data.mirrorMaker.setScene(self.$data.scene);
        self.$data.mirrorMaker.setWorld(world);

        self.$data.shapeMaker.createShape(self.$data.shapeMaker.getShapeTypes().Sphere, {x:0,y:1,z:-2},[.5],5);
        self.$data.shapeMaker.createShape(self.$data.shapeMaker.getShapeTypes().Cube, {x:.2,y:2,z:-1.7},[.4,.4,.4],5);

        for(var i = 0; i < self.$data.segmentAdvance; i++){
            self.addTrackSegment(i, Math.random() > .5, Math.random() > .5);
        }

        setInterval(() => {
            if(self.$data.pedalDown){
                // console.log(self.$data.easePosition.y * -1);
                let speed = self.$data.easePosition.y * -1;
                if(speed < self.$data.maxSpeed){
                    speed = self.$data.maxSpeed;
                }
                else if(speed > self.$data.minSpeed){
                    speed = self.$data.minSpeed;
                }
                self.$data.shapeMaker.getShapes()[0].body.velocity.set(0,0,speed);
            }
            self.$data.easePosition.x += (self.$data.easePosition._x - self.$data.easePosition.x) / self.$data.easePosition.ease;
            self.$data.easePosition.y += (self.$data.easePosition._y - self.$data.easePosition.y) / self.$data.easePosition.ease;
            
            self.$data.deltaTime = clock.getDelta();
            self.$data.totalTime += self.$data.deltaTime;
            world.step(1.0 / 60.0, self.$data.deltaTime, 3);
            let i = 0
            for(i = 0; i<self.$data.shapeMaker.getShapes().length;i++){
                self.$data.shapeMaker.getShapes()[i].update();
            }
            for(i = 0; i < self.$data.mirrorMaker.getShapes().length;i++){
                let baseAngle = self.$data.easePosition.x * .002;
                let angle = baseAngle > 0 ? baseAngle * -1 : baseAngle;
                self.$data.mirrorMaker.getShapes()[i].body.quaternion.setFromAxisAngle(new self.CANNON.Vec3(0,0,self.$data.easePosition.x * .002),angle);
                if(self.$data.mirrorMaker.getShapes()[i].body.position.x != 0 || self.$data.mirrorMaker.getShapes()[i].body.position.y != 0){
                    let mirrorPos = {
                        x: jstrig.orbit(0, self.$data.mirrorStats[i].dist, (self.$data.mirrorMaker.getShapes()[i].mesh.rotation.z * (180/Math.PI)) + self.$data.mirrorStats[i].angle, 'cos'),
                        y: jstrig.orbit(0, self.$data.mirrorStats[i].dist, (self.$data.mirrorMaker.getShapes()[i].mesh.rotation.z * (180/Math.PI)) + self.$data.mirrorStats[i].angle, 'sin')
                    };
                    self.$data.mirrorMaker.getShapes()[i].body.position.x = mirrorPos.x;
                    self.$data.mirrorMaker.getShapes()[i].body.position.y = mirrorPos.y;

                }
                self.$data.mirrorMaker.getShapes()[i].update();
                
            }
            self.$data.camera.position.z = self.$data.shapeMaker.getShapes()[0].mesh.position.z + 4;
            let currentSegmentPosition = (Math.floor(self.$data.camera.position.z / self.$data.segmentSize.z) * -1) + self.$data.segmentAdvance;
            let removalSegmentPosition = (Math.floor(self.$data.camera.position.z / self.$data.segmentSize.z) * -1) - self.$data.segmentAdvance;
            // console.log(Math.floor(self.$data.camera.position.z / 4));
            self.addTrackSegment(currentSegmentPosition, Math.random() > .5, Math.random() > .5);
            self.removeTrackSegment(removalSegmentPosition);
            self.$data.renderer.render(self.$data.scene, self.$data.camera);
            console.log(self.$data.segmentGroups);
            // self.$data.easePosition._x += self.$data.easePosition.x > 0 ? Math.random() * -0.01 : Math.random() * 0.01;
            
            
        }, 33);


    }
}
</script>
<style>
    div.three-container{
        width:500px;
        height:500px;
    }
    div.tracker{
        width:500px;
        height: 200px;
        background-color: #cc0000;;
    }
    div.cover{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.2);
    }
</style>