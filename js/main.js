let app =new Vue ({
  el : "#app",
  data:{
  error: false,
  itemsList:[],
  items: [],
  itemName: '',
  taskName: '',
  changeName: '',
  id_main: 0,
  id: 0,
  hope: 0,
  sear: '',

  },
  mounted(){
    if(localStorage.getItem('itemsList')){
      try {
        this.itemsList = JSON.parse(localStorage.getItem('itemsList'));
      }catch(e){
        localStorage.removeItem('itemsList');
      }
    }
    if(localStorage.getItem('items')){
      try{
        this.items = JSON.parse(localStorage.getItem('items'));
      }catch(e){
        localStorage.removeItem('items');
      }
    }
    if(localStorage.getItem('id')){
      try{
        this.id = JSON.parse(localStorage.getItem('id'));
      }catch(e){
        localStorage.removeItem('id');
      }
    }
    if(localStorage.getItem('id_main')){
      try{
        this.id_main = JSON.parse(localStorage.getItem('id_main'));
      }catch(e){
        localStorage.removeItem('id_main');
      }
    }
  },
  methods:{
    search: function(){
      for(let p = 0; p < this.itemsList.length; p++){
        if(this.itemsList[p].itemName[0] == this.sear){
          let save = this.itemsList[0];
          Vue.set(this.itemsList,0, this.itemsList[p]);
          Vue.set(this.itemsList,p, save);
          this.sear = '';
        }
      }
    },
    add: function(){
      if(this.itemName == ''){
        this.error = true;
      }else{
        this.error = false;
        this.itemsList.push({itemName: [this.itemName, this.id_main++, false]});
        this.saveItems();
        this.itemName = '';
      }
    },
    add2: function(){
      if(this.taskName == ''){
        this.error = true;
      }else{
        this.error = false;
        this.items.push({taskName : [this.taskName, this.hope, this.id++, false]});
        this.saveItems();
        this.taskName = '';
      }
    },
    remove: function(del){
        for(let r = 0; r < this.items.length; r++){
          if(this.items[r].taskName[2] == del){
            this.items.splice(r, 1);
          }
        }
        this.saveItems();
    },
    remove_main: function(del){
      for(let l = 0; l < this.itemsList.length; l++){
        if(this.itemsList[l].itemName[1] == del){
          this.itemsList.splice(l, 1);
        }
      }
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].taskName[1] == del){
          this.items.splice(i, 1);
          i--;
        }
      }
      this.saveItems();
    },
    change_field: function(fil){
      for(let g = 0; g < this.items.length; g++){
        if(this.items[g].taskName[2] == fil){
          Vue.set(this.items[g].taskName,0, this.changeName);
          Vue.set(this.items[g].taskName,3, false);
        }
      }
      this.saveItems();
    },
    change_field_main: function(fil){
      for(let g = 0; g < this.itemsList.length; g++){
        if(this.itemsList[g].itemName[1] == fil){
          Vue.set(this.itemsList[g].itemName,0, this.changeName);
          Vue.set(this.itemsList[g].itemName,2, false);
        }
      }
      this.saveItems();
    },
    change_task: function(chan){
      for(let k = 0; k < this.items.length; k++){
        if(this.items[k].taskName[2] == chan){
          if(this.items[k].taskName[3] == false){
            Vue.set(this.items[k].taskName,3, true);
          }
          else{
            Vue.set(this.items[k].taskName,3, false);
          }
        }else{
          Vue.set(this.items[k].taskName,3, false);
        }
      }
    },
    change_task_main: function(chan){
      for(let k = 0; k < this.itemsList.length; k++){
        if(this.itemsList[k].itemName[1] == chan){
          if(this.itemsList[k].itemName[2] == false){
            Vue.set(this.itemsList[k].itemName,2, true);
          }
          else{
            Vue.set(this.itemsList[k].itemName,2, false);
          }
        }else{
          Vue.set(this.itemsList[k].itemName,2, false);
        }
      }
    },
    saveItems(){
      const parsed = JSON.stringify(this.itemsList);
      localStorage.setItem('itemsList', parsed);
      const items = JSON.stringify(this.items);
      localStorage.setItem('items', items);
      const id = JSON.stringify(this.id);
      localStorage.setItem('id', id);
      const id_main = JSON.stringify(this.id_main);
      localStorage.setItem('id_main', id_main);
    }
  }
})
