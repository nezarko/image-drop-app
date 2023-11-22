class Queue {
    constructor(){
        this.elements = [];
        this.tail = 0;
        this.head = 0;
    }


    // add element to queue 

    enqueue(element) {
       // add element to tail first element is the last element in the index 
       // first in first out 
       
       this.elements[this.tail] = element ;

       this.tail++
    }


    // delete element from queue 

     dequeue(){
        // first element which is in the tail index of elements array will be removed 
        this.elements.shift();
    }

    delay(time){
        return new Promise(resolve => setTimeout(() => resolve(true) , time))
    }
}

const q = new Queue() ;
for(let i =0 ; i <10 ; i++){
   q.enqueue(i);
}

// q.dequeue()


/***
 * 
 * Will recive an element and store it in a stack 
 * remove element from stack whenever request for action 
 * MEthod: Queue : first in first out 
 * 
 * will ading element to the begining of queue
 * 
 * queu  = head ---- tail 
 * at the initlize of queue will be empty [head = 0 , tail = 0 ]
 * 
 */
