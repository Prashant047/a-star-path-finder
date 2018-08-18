import {Pt} from 'pts';
import settings from './settings';
import {obstacle} from './obstacle';

const get_id = (x, y) => {
    return y*settings.no_cols + x;
};

export class Node{
    /**
     * 
     * @param {Number} row 
     * @param {Number} col 
     * @param {Number} id 
     */
    constructor(row, col, color){
        this.row = row;
        this.col = col;
        this.id = get_id(col, row);
        this.edge_list = [];
        this.pt = new Pt([
            col*settings.cell_size + (settings.cell_size/2),
            row*settings.cell_size + (settings.cell_size/2)
        ]);
        this.color = color;
        
        let adj_nodes = [{ x: col, y: row -1},{x: col,y: row + 1},{x: col + 1,y: row},{x: col -1,y: row}];

        adj_nodes.forEach((n) => {
            let is_obstacle_point = false;
            if(n.x >= 0 && n.y >= 0 && n.x < settings.no_cols && n.y < settings.no_rows ){
                for(let i=0;i<obstacle.length;i++){
                    // for(let j=0;j<4;j++){
                    //     if(n.x == obstacle[i][j].x && n.y == obstacle[i][j].y){
                    //         is_obstacle_point = true;
                    //         break;
                    //     }
                    //     if(is_obstacle_point){
                    //         break;
                    //     }
                    // }
                    if(n.x>=obstacle[i][0].x&&n.x<=obstacle[i][1].x&&n.y>=obstacle[i][0].y&&n.y<=obstacle[i][2].y){
                        is_obstacle_point = true;
                        break;
                    }
                }
                if(!is_obstacle_point){this.edge_list.push(get_id(n.x,n.y));}
            }
        });

    }
}