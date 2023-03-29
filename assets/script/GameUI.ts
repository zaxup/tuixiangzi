import {_decorator, Component, Node, Prefab, instantiate, Sprite, resources, SpriteFrame, Layout, Vec2} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(Prefab)
    spritePrefab: Prefab;
    //双斜杆，单行注释
    /*扩展   todo mapStr直接写在代码里，大家可以通过文件加载的方式加载，比如放在txt*/
    /**
     * 0-空白地面
     * 1-代表墙
     * 2-目标点
     * 3-人物
     * 4-代表箱子
     * 5-代表箱子在目标点
     * 6-人物在目标点的状态
     */
    mapStr: string = "00111000\n" +
        "00121000\n" +
        "00101111\n" +
        "11140421\n" +
        "12043111\n" +
        "11114100\n" +
        "00012100\n" +
        "00011100";

    /**
     * 人物的坐标
     */
    player: Vec2;

    spriteNodeArray: Node[][] = [];

    valArray: number[][] = [];

    /**
     * todo 扩展，调整预制资源的大小，地图的大小，地图的位置    这些都交给你们自己去实现。
     */
    start() {
        let mapLayoutNode = this.node.getChildByName('MapLayout');

        let mapArr = this.mapStr.split("\n");
        mapLayoutNode.getComponent(Layout).constraintNum = mapArr.length;

        for (let i = 0; i < mapArr.length; i++) {
            let line = mapArr[i];
            this.spriteNodeArray[i] = [];
            this.valArray[i] = [];
            for (let j = 0; j < line.length; j++) {
                let val = line.charAt(j);
                let spriteNode = instantiate(this.spritePrefab);
                resources.load(`${val}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                    spriteNode.getComponent(Sprite).spriteFrame = spriteFrame;
                });
                mapLayoutNode.addChild(spriteNode);
                if (Number(val) == 3) {
                    this.player = new Vec2();
                    this.player.x = i;
                    this.player.y = j;
                }
                this.spriteNodeArray[i][j] = spriteNode;
                this.valArray[i][j] = Number(val);
            }
        }
    }

    update(deltaTime: number) {

    }

    /**
     * 0-空白地面
     * 1-代表墙
     * 2-目标点
     * 3-人物
     * 4-代表箱子
     * 5-代表箱子在目标点
     * 6-人物在目标点的状态
     */
    leftBtn() {
        let leftVal = this.valArray[this.player.x][this.player.y - 1];
        //如果左边是墙的话，不能过来
        if (leftVal == 1) {
            return;
        }
        //如果左边是箱子，
        if (leftVal == 4 || leftVal == 5) {
            let leftLeftVal = this.valArray[this.player.x][this.player.y - 2];
            if (leftLeftVal == 1 || leftLeftVal == 4 || leftLeftVal == 5) {
                return;
            }
            let leftLeftSpriteNode = this.spriteNodeArray[this.player.x][this.player.y - 2];
            if (leftLeftVal == 2) {
                this.valArray[this.player.x][this.player.y - 2] = 5;
            } else {
                this.valArray[this.player.x][this.player.y - 2] = 4;
            }
            if (leftVal == 4) {
                this.valArray[this.player.x][this.player.y - 1] = 0;
            }
            if (leftVal == 5) {
                this.valArray[this.player.x][this.player.y - 1] = 2;
            }
            resources.load(`${this.valArray[this.player.x][this.player.y - 2]}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                leftLeftSpriteNode.getComponent(Sprite).spriteFrame = spriteFrame;
            });
        }
        leftVal = this.valArray[this.player.x][this.player.y - 1];
        let leftSpriteNode = this.spriteNodeArray[this.player.x][this.player.y - 1];
        if (leftVal == 2) {
            this.valArray[this.player.x][this.player.y - 1] = 6;
        } else {
            this.valArray[this.player.x][this.player.y - 1] = 3;
        }
        resources.load(`${this.valArray[this.player.x][this.player.y - 1]}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            leftSpriteNode.getComponent(Sprite).spriteFrame = spriteFrame;
        });
        let playerVal = this.valArray[this.player.x][this.player.y];
        let playerSpriteNode = this.spriteNodeArray[this.player.x][this.player.y];
        if (playerVal == 3) {
            this.valArray[this.player.x][this.player.y] = 0;
        } else if (playerVal == 6) {
            this.valArray[this.player.x][this.player.y] = 2;

        }
        resources.load(`${this.valArray[this.player.x][this.player.y]}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            playerSpriteNode.getComponent(Sprite).spriteFrame = spriteFrame;
        });
        this.player.y = this.player.y - 1;
    }

    rightBtn() {

    }

    upBtn() {

    }

    downBtn() {

    }
}


