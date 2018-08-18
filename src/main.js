import {CanvasSpace, Rectangle, Pt, Circle} from 'pts';
import settings from './settings';
import {Node} from './Node';
import {obstacle} from './obstacle';
import {PQueue} from './p_queue';

// CHANGE THE START AND DESTINATION POSITION HERE ----
// ___________________________________________________
const START = new Pt([1,3]);
const DESTINATION = new Pt([24,12]);
// ___________________________________________________
// ---------------------------------------------------


const space = new CanvasSpace('#can');
space.setup({
    bgcolor: '#FBFCFF'
});
const form  = space.getForm();

const get_coord_from_pos = (x, y) => {
    return  new Pt([x*settings.cell_size + (settings.cell_size/2),y*settings.cell_size + (settings.cell_size/2)]);
};

const get_coord_from_pt = (pt) => {
    return  new Pt([pt.x*settings.cell_size + (settings.cell_size/2),pt.y*settings.cell_size + (settings.cell_size/2)]);
};

const get_pos_from_id = (id) => {
    return new Pt([id%settings.no_cols,Math.floor(id/settings.no_cols)]);
};

const get_heuristic_value = (p1, p2, dis) => {
    return Math.sqrt(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2)) + dis;
};

// console.log(get_heuristic_value(new Pt([0,0]), new Pt([300,400]) ));

const get_id = (x, y) => {
    return y*settings.no_cols + x;
};


let color = '#247BA0';
let NodeMap = [new Node(0,0,color)];
for(let i=0;i<settings.no_rows;i++){
    for(let j=0;j<settings.no_cols;j++){
        if(i == 0 && j == 0){
            continue;
        }
        
        NodeMap.push(new Node(i, j, color));
    }
}

obstacle.forEach((obs) => {
    for(let i=obs[0].x;i<=obs[1].x;i++){
        for(let j=obs[0].y;j<=obs[2].y;j++){
            NodeMap[get_id(i,j)].color = '#F25F5C';
        }
    }
});
NodeMap[get_id(START.x, START.y)].color = '#598B2C';
NodeMap[get_id(DESTINATION.x, DESTINATION.y)].color = '#598B2C';

console.log(NodeMap[get_id(10, 12)]);


const find_path = (s, d) => {
    // Implementing A* Path finding Algorithm ----
    const path = [];
    let path_found = false;

    const source_id = get_id(s.x, s.y);
    const destination_id = get_id(d.x, d.y);
    
    const visited = new Array(500).fill(0);
    const info  = new Array(500);
    for(let i=0;i<info.length;i++){
        info[i] = {
            id: i,
            heuristic_cost: Infinity,
            cost: Infinity,
            from: -1
        };
    }
    
    const queue = new PQueue();
    info[source_id].cost = 0;
    queue.insert({
        id: source_id,
        key: get_heuristic_value(
            get_coord_from_pt(get_pos_from_id(s)),
            get_coord_from_pt(get_pos_from_id(d)),
            0
        )
    });


    while(!queue.is_empty()){
        let temp = queue.get_max_priority();
        visited[temp] = 1;

        NodeMap[temp].edge_list.forEach((v) => {
            if(v == destination_id){
                path_found = true;
            }

            if(!visited[v]){
                if(!queue.contains(v)){
                    queue.insert({
                        id: v,
                        key: info[v].heuristic_cost
                    })
                }
                if(info[temp].cost + 1 < info[v].cost){
                    info[v].cost = info[temp].cost+ 1;
                    let h = get_heuristic_value(
                        get_coord_from_pt(get_pos_from_id(v)),
                        get_coord_from_pt(get_pos_from_id(d)),
                        info[temp].cost + 1
                    );
                    info[v].heuristic_cost = h;
                    info[v].from = temp;
                    queue.update_h(v,h);
                }
            }
        });
        if(path_found){
            break;
        }

        queue.delete_highest_priority();

    }

    if(path_found){
        let f = destination_id;
        while(f!=-1){
            path.push(f);
            f = info[f].from;
        }
    }


    return path;
}


let is_dragging = false;
window.addEventListener('click', () => {
    clicked = true;
});


space.add(() => {
    const shortest_path = find_path(START, DESTINATION);
    shortest_path.reverse();

    let start_point = Circle.fromCenter(get_coord_from_pt(START), 10);
    let destination_point = Circle.fromCenter(get_coord_from_pt(DESTINATION), 10);

    NodeMap.forEach((node) => {
        let right = get_coord_from_pos(node.col + 1 , node.row);
        let bottom = get_coord_from_pos(node.col, node.row + 1);

        if(right.x < settings.width){
            form.strokeOnly(color).line([node.pt,right]);
        }
        if(bottom.y < settings.height){
            form.strokeOnly(color).line([node.pt, bottom]);
        }

        form.fillOnly(true);
        form.fill(node.color).point(node.pt, 5, 'circle');

        
        
    });
    form.fill('#598B2C').circle( start_point);
    form.fill('#598B2C').circle( destination_point);


    //Drawing obstacle----
    obstacle.forEach((obs) => {
        form.fillOnly(true);
        form.fill('#F25F5C').rect(Rectangle.fromTopLeft(
            get_coord_from_pos(obs[0].x, obs[0].y),
            settings.cell_size*(obs[1].x-obs[0].x),
            settings.cell_size*(obs[2].y-obs[0].y)
        ));
    });

    // Draw shortest Path -------
    for(let i=0;i<shortest_path.length-1;i++){
        form.strokeOnly('#598B2C',4).line([
            get_coord_from_pt(get_pos_from_id(shortest_path[i])),
            get_coord_from_pt(get_pos_from_id(shortest_path[i+1]))
        ]);
    }

    // space.pause();

});
space.play().bindMouse();



// while(queue.length != 0){
    //     let temp = queue[0];
    //     visited[temp] = 1;
    //     NodeMap[temp].edge_list.forEach((n) => {
    //         // console.log("temp --" + temp);
    //         if(!visited[n]){
    //             form.strokeOnly(color).line([NodeMap[temp].pt,NodeMap[n].pt]);
    //             if(!queue.includes(n)){
    //                 // console.log(n);

                    
    //                 queue.push(n);
                    
    //             }
    //         }
    //     });
    //     queue.splice(0,1);
    // }