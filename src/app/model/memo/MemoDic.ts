export class MemoDic{
    key : string;
    value : string;

    constructor(key : string, value:string){
        this.key =  this.mapToMemoElement(key);
        this.value =  this.mapToMemoElement(value);
    }

    mapToMemoElement(el :string) : string{
        if(el.includes(",")){
            return "["+el+"]";
        }
        return el;
    }

    changeValue(value : string){
        this.value = this.mapToMemoElement(value);
    }
}