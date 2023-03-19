import {_decorator, Component, Node,Prefab, instantiate, Sprite, resources, SpriteFrame,Layout} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(Prefab)
    spritePrefab:Prefab;
    //双斜杆，单行注释
    /*扩展   todo mapStr直接写在代码里，大家可以通过文件加载的方式加载，比如放在txt*/
    mapStr: string = "00111000\n" +
        "00121000\n" +
        "00101111\n" +
        "11140421\n" +
        "12043111\n" +
        "11114100\n" +
        "00012100\n" +
        "00011100";

    /**
     * todo 扩展，调整预制资源的大小，地图的大小，地图的位置    这些都交给你们自己去实现。
     */
    start() {
        let mapLayoutNode = this.node.getChildByName('MapLayout');

        let mapArr = this.mapStr.split("\n");
        mapLayoutNode.getComponent(Layout).constraintNum=mapArr.length;

        for (let i = 0; i < mapArr.length; i++) {
            let line = mapArr[i];
            for (let j = 0; j < line.length; j++) {
                let val = line.charAt(j);
                let spriteNode = instantiate(this.spritePrefab);
                resources.load(`${val}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                    spriteNode.getComponent(Sprite).spriteFrame = spriteFrame;
                });
                mapLayoutNode.addChild(spriteNode);
            }
        }
    }

    update(deltaTime: number) {

    }
}


