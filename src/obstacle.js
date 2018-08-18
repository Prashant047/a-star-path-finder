import {Pt} from 'pts';

const generate_points = (x, y, w, h) => {
    return [new Pt([x,y]), new Pt([x+w,y]), new Pt([x, y+h]), new Pt([x+w,y+h])];
};

export const obstacle = [
    generate_points(2,2,1,3),
    generate_points(6,8,2,2),
    generate_points(8,4,1,1),
    generate_points(2,12,2,1),
    generate_points(14,5,3,2),
    generate_points(11,11,2,2),
    generate_points(11,0,4,1),
    generate_points(11,7,1,1),
    generate_points(17,1,1,1),
    generate_points(22,0,1,1),
    generate_points(7,16,2,2),
    generate_points(1,8,1,1),
    generate_points(15,18,3,1),
    generate_points(17,10,2,2),
    generate_points(23,7,1,3),
    generate_points(20,15,1,1),
    generate_points(2,16,1,1)
];