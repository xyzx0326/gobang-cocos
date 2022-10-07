import {
  _decorator,
  Component,
  Graphics,
  Prefab,
  director,
  instantiate,
} from "cc";

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass("board")
@executeInEditMode(true)
export class board extends Component {
  @property(Prefab)
  public white: Prefab;
  @property(Prefab)
  public black: Prefab;

  private boardPosArray = [];

  private width = 518;
  private gridWidth = 37;
  // LIFE-CYCLE CALLBACKS:
  start() {
    const g = this.getComponent(Graphics);
    g.lineWidth = 2;
    g.fillColor.fromHEX("#baa17e");
    g.strokeColor.fromHEX("#baa17e");
    const dot1 = this.gridWidth * 3;
    const dot2 = this.gridWidth * 7;
    const dot3 = this.gridWidth * 11;
    for (let i = 0; i < 15; i++) {
      g.moveTo(this.gridWidth * i, 0);
      g.lineTo(this.gridWidth * i, -this.width);
    }
    for (let i = 0; i < 15; i++) {
      g.moveTo(0, -this.gridWidth * i);
      g.lineTo(this.width, -this.gridWidth * i);
    }

    this.node.removeAllChildren();
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if ((i * 15 + j) % 2 == 1) {
          this.addBlack(this.gridWidth * i, -this.gridWidth * j);
        } else {
          this.addWhite(this.gridWidth * i, -this.gridWidth * j);
        }
      }
    }
    console.log();
    g.circle(dot1, -dot1, 4);
    g.circle(dot2, -dot2, 4);
    g.circle(dot1, -dot3, 4);
    g.circle(dot3, -dot1, 4);
    g.circle(dot3, -dot3, 4);
    g.stroke();
    g.fill();
    // cc.debug.setDisplayStats(false);
    // const hLines = 15; // 水平线数量
    // const vLines = 15; // 垂直线数量
    // this.blockWidth = (this.node.width / (vLines - 1)).toFixed(2); // 每块区域的宽度
    // this.blockHeight = (this.node.height / (hLines - 1)).toFixed(2); // 每块区域的高度
    // this.boardPosArray = []; // 棋盘上所有点的坐标
    // this.getBoardPos(hLines, vLines);
    // this.currentPlayer = "BLACK"; // 当前着步方
    // this.initTouchDots(); // 添加所有触摸点
  }

  clearBoard() {
    this.node.removeAllChildren();
  }

  addWhite(x, y) {
    let node = instantiate(this.white);
    this.node.addChild(node);
    node.setPosition(x, y, 0);
  }

  addBlack(x, y) {
    let node = instantiate(this.black);
    this.node.addChild(node);
    node.setPosition(x, y, 0);
  }

  update(deltaTime: number) {
    let width = 518;
    let gridWidth = 37;
  }
}
