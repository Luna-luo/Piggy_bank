const localStorageKeyName = 'tagList';
type Tag = {
  id:string;
  name:string;
}
type TagListModel = {
  data:Tag[]
  fetch:()=>Tag[]
  create:(name:string)=>'success'|'duplicated'//联合类型
  save:()=>void
}
const tagListModel: TagListModel = {
  data:[],
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name){
    //this.data = [{id:'1',name:'1'},{id:'2',name:'2'}]
    const names = this.data.map(item => item.name);
    if(names.indexOf(name)>=0){return 'duplicated';}
    this.save();
    return'success';
  },
  save(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;