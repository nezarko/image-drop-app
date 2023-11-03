import ImagesStore from '../assets/imagesStore.json';
class Store { 
    constructor(images){
        this.images = images ; 
    }

  getImages(){
    return this.images ;
  }

  getImage(index){
    if(!index) index = this.#randomIndex() ;
    return this.images[index];
  }

  #randomIndex(){
    return Math.floor(Math.random() * 7) + 1;
  }
}


// construct a  new instance of store  


export default new Store(ImagesStore);