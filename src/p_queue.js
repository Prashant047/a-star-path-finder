export class PQueue{
    constructor(){
        this.queue = []
    }

    is_empty(){
        if(this.queue.length != 0){
            return false;
        }
        return true;
    }

    insert(v){
        this.queue.push(v);
    }

    get_max_priority(){
        let index = 0;
        let key_ = this.queue[index].key;
        this.queue.forEach((v,i) => {
            if(v.key < key_){
                key_ = key;
                index = i;
            }
        });

        return this.queue[index].id;
    }

    delete_highest_priority(){
        let index = 0;
        let key_ = this.queue[index].key;
        this.queue.forEach((v,i) => {
            if(v.key < key_){
                key_ = key;
                index = i;
            }
        });
        this.queue.splice(index, 1);

    }

    contains(id){
        let contains = false;
        for(let i=0;i<this.queue.length;i++){
            if(this.queue[i].id == id){
                contains = true;
                break;
            }
        }
        return contains;
    }

    update_h(id, h){
        for(let i=0;i<this.queue.length;i++){
            if(id == this.queue[i].id){
                this.queue[i].key = h;
                break;
            }
        }
    }
}