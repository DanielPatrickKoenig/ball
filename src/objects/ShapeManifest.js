import ShapeMaker from './ShapeMaker.js';
const sm = new ShapeMaker();
const shapeList = [
    {
        index: 25,
        items: [
            {
                position: {x:.25,y:0,z: 0},
                size: {width: .5, height: .05, depth: 1},
                type: sm.getShapeTypes().Cube
            }
        ]
    },
    {
        index: 31,
        items: [
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
        ]
    },
    {
        index: 36,
        items: [
            {
                position: {x:-.25,y:0,z: 0},
                size: {width: .5, height: .05, depth: 1},
                type: sm.getShapeTypes().Cube
            }
        ]
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