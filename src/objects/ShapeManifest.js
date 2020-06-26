import ShapeMaker from './ShapeMaker.js';
const sm = new ShapeMaker();
const templates  = {
    EMPTY: [],
    HALF_TRACK_RIGHT: [
        {
            position: {x:.25,y:0,z: 0},
            size: {width: .5, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        }
    ],
    HALF_TRACK_LEFT: [
        {
            position: {x:-.25,y:0,z: 0},
            size: {width: .5, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        }
    ],
    CENTER_BEAM: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: .2, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        }
    ],
    HALF_WALL_RIGHT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:0,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube
        }
    ],
    HALF_WALL_LEFT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:0,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube
        }
    ],
    RAMP: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.05/5,z: -.15},
            size: {width: 1, height: .05/5, depth: .7},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.1/5,z: -.2},
            size: {width: 1, height: .1/5, depth: .6},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.15/5,z: -.25},
            size: {width: 1, height: .15/5, depth: .5},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.2/5,z: -.3},
            size: {width: 1, height: .2/5, depth: .4},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.25/5,z: -.35},
            size: {width: 1, height: .25/5, depth: .3},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.3/5,z: -.4},
            size: {width: 1, height: .3/5, depth: .2},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.35/5,z: -.45},
            size: {width: 1, height: .35/5, depth: .1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:0,y:.4/5,z: -.5},
            size: {width: 1, height: .4/5, depth: .1},
            type: sm.getShapeTypes().Cube
        }
    ],
    HALF_RAMP_LEFT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.05/5,z: -.15},
            size: {width: .5, height: .05/5, depth: .7},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.1/5,z: -.2},
            size: {width: .5, height: .1/5, depth: .6},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.15/5,z: -.25},
            size: {width: .5, height: .15/5, depth: .5},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.2/5,z: -.3},
            size: {width: .5, height: .2/5, depth: .4},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.25/5,z: -.35},
            size: {width: .5, height: .25/5, depth: .3},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.3/5,z: -.4},
            size: {width: .5, height: .3/5, depth: .2},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.35/5,z: -.45},
            size: {width: .5, height: .35/5, depth: .1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.4/5,z: -.5},
            size: {width: .5, height: .4/5, depth: .1},
            type: sm.getShapeTypes().Cube
        }
    ],
    HALF_RAMP_RIGHT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.05/5,z: -.15},
            size: {width: .5, height: .05/5, depth: .7},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.1/5,z: -.2},
            size: {width: .5, height: .1/5, depth: .6},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.15/5,z: -.25},
            size: {width: .5, height: .15/5, depth: .5},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.2/5,z: -.3},
            size: {width: .5, height: .2/5, depth: .4},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.25/5,z: -.35},
            size: {width: .5, height: .25/5, depth: .3},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.3/5,z: -.4},
            size: {width: .5, height: .3/5, depth: .2},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.35/5,z: -.45},
            size: {width: .5, height: .35/5, depth: .1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.4/5,z: -.5},
            size: {width: .5, height: .4/5, depth: .1},
            type: sm.getShapeTypes().Cube
        }
    ],
    MOVABLE_2_BLOCK_WALL: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.25,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube,
            mass: 1
        },
        {
            position: {x:-.25,y:.25,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube,
            mass: 1
        }
    ],
    MOVABLE_RIGHT_STATIC_LEFT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:.25,y:.25,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube,
            mass: 5
        },
        {
            position: {x:-.25,y:0,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube
        }
    ],
    MOVABLE_LEFT_STATIC_RIGHT: [
        {
            position: {x:0,y:0,z: 0},
            size: {width: 1, height: .05, depth: 1},
            type: sm.getShapeTypes().Cube
        },
        {
            position: {x:-.25,y:.25,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube,
            mass: 5
        },
        {
            position: {x:.25,y:0,z: 0},
            size: {width: .5, height: .5, depth: .05},
            type: sm.getShapeTypes().Cube
        }
    ]
};
const shapeList = [
    {
        index: 15,
        items: templates.MOVABLE_LEFT_STATIC_RIGHT
    },
    {
        index: 25,
        items: templates.HALF_TRACK_LEFT
    },
    {
        index: 31,
        items: templates.HALF_WALL_RIGHT
    },
    {
        index: 36,
        items: templates.HALF_TRACK_RIGHT
    },
    {
        index: 40,
        items: templates.HALF_RAMP_LEFT
    },
    {
        index: 41,
        items: templates.EMPTY
    },
    {
        index: 49,
        items: templates.HALF_RAMP_RIGHT
    },
    {
        index: 50,
        items: templates.EMPTY
    }
];
const ShapeManifest = {
    shapes: shapeList,
    getShapeByIndex: function (index) {
        let shapeData;
        for (let i = 0; i < shapeList.length; i++){
            if(shapeList[i].index == index){
                shapeData = shapeList[i].items;
            }
        }
        return shapeData;
    }
};
export default ShapeManifest;