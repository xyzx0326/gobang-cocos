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
// @executeInEditMode(true)
export class board extends Component {
  @property(Prefab)
  public white: Prefab;
  @property(Prefab)
  public black: Prefab;
  @property(Prefab)
  public touch: Prefab;
  @property(Prefab)
  public select: Prefab;

  private board = [];

  private isSelect;

  private isWhite = false;

  private width = 518;
  private gridWidth = 37;
  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    // 清空
    this.node.removeAllChildren();
    // 画线
    this.line();
    // 设置触摸点
    this.initTouch();
  }

  line() {
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

    g.circle(dot1, -dot1, 4);
    g.circle(dot2, -dot2, 4);
    g.circle(dot1, -dot3, 4);
    g.circle(dot3, -dot1, 4);
    g.circle(dot3, -dot3, 4);
    g.stroke();
    g.fill();
  }

  initTouch() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        let node = instantiate(this.touch);
        this.node.addChild(node);
        node.getComponent("touch").initBoard(this, i * 15 + j);
        node.setPosition(this.gridWidth * i, -this.gridWidth * j, 0);
      }
    }
  }

  clearBoard() {
    this.node.removeAllChildren();
  }

  addWhite(x, y) {
    let node = instantiate(this.white);
    this.node.addChild(node);
    node.setPosition(x, y, 0);
  }

  addSelect(x, y, color) {
    let node = instantiate(this.select);
    this.node.addChild(node);
    node.setPosition(x, y, 0);
    let select = node.getChildByName("select");
    select.getComponent("select").setColor(color);
    return node;
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

  putPiece(index: number) {
    let i = Math.floor(index / 15);
    let j = index % 15;
    if (!this.board[index]) {
      if (this.isSelect) {
        let has = this.board.indexOf(this.isSelect)
        if (has != -1) {
          this.board[has] = undefined
        }
        this.node.removeChild(this.isSelect);
        this.isSelect = undefined;
      }
      if (this.isWhite) {
        this.isSelect = this.addSelect(
          this.gridWidth * i,
          -this.gridWidth * j,
          "#ffffff"
        );
      } else {
        this.isSelect = this.addSelect(
          this.gridWidth * i,
          -this.gridWidth * j,
          "#000000"
        );
      }
      this.board[index] = this.isSelect;
    } else {
      let temp = this.board[index];
      if (temp && temp === this.isSelect) {
        if (this.isWhite) {
          this.addWhite(this.gridWidth * i, -this.gridWidth * j);
          this.board[index] = 1;
        } else {
          this.addBlack(this.gridWidth * i, -this.gridWidth * j);
          this.board[index] = -1;
        }
        this.node.removeChild(this.isSelect);
        this.isSelect = undefined;
        this.isWhite = !this.isWhite;
      }
    }
  }
}
