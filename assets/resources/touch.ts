import { _decorator, Component, input, Input, EventTouch } from 'cc';
import { board } from './board';
const { ccclass, property } = _decorator;

@ccclass('touch')
export class touch extends Component {

    private board: board
    
    private index:number

    onLoad () {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy () {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    initBoard(board, index) {
        this.board = board;
        this.index = index;
    }

    onTouchStart(event: EventTouch) {
        this.board.putPiece(this.index);
    }

}

