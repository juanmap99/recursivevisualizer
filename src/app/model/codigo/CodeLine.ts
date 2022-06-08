import { CodeSegment } from "./CodeSegment";

export class CodeLine{
    nroLinea : number;
    focus : boolean = false;
    contenido : CodeSegment[];
    classDic = new Map([
        [' ','default-code-dark'],
        ['$b','default-code-dark'],//Para la identacion
        ['$s','syntax-code-dark'],
        ['$u','number-code-dark'],
        ['$f','lg-function-code-dark'],
        ['$d','us-function-code-dark'],
        ['$c','string-code-black']
      ]);

    constructor(){
        this.nroLinea = -1
        this.contenido = []
    }
    
    activateFocus(){
        this.focus = true;
    }
    
    desactivateFocus(){
        this.focus = false;
    }

    isNumber(value: string | number): boolean{
        return ((value != null) &&
                (value !== '') &&
                !isNaN(Number(value.toString())));
    }

    /**
     * 
     * @param line String que representa una linea
     * @returns Diccionario con el iComienzo del contenido de la linea y el nro de la linea
     */
    getNroLinea(line : string){
        if(line[0] == "-") return {iComienzo : 1, nroLinea : -99}
        let i = 0;
        let lineNumber : string[] = [];
        while(this.isNumber(line.charAt(i))){
            lineNumber.push(line.charAt(i));
            i += 1;
        }
        return {iComienzo : i, nroLinea : Number(lineNumber.join("")) }
    }

    /**
     * Carga el contenido de la linea
     * @param line String que representa una linea
     */
    loadLine(line : string){
        let lineaComienzo = this.getNroLinea(line);
        this.nroLinea = lineaComienzo.nroLinea;
        let iComienzo = lineaComienzo.iComienzo;
        let segments : string[] = this.getLineSegments(line,iComienzo);

        let j = 0;
        while(j < segments.length){
            let contenido : CodeSegment = {
                cssClass : this.getSegmentClass(segments[j]),
                texto : this.getSegmentText(segments[j])
            }
            this.contenido.push(contenido)
            j += 1;
        }
    }

    /**
     * Separa a una linea en segmentos, entendiendo a segmentos como una porcion de texto dentro de una
     * linea que debe ser tratada de una manera diferente al resto de porciones de texto dentro de esa linea.
     * Estos segmentos son utilizados para colorear cada segmento en especifico segun el tipo de sintaxis
     * que sea encerrada a traves del signo '$'.
     * 
     * @param line Una de las lineas contenidas en el archivo .txt cargadas en 'codeLinesArray'
     * @returns Lista de tipo 'string[]' que representa los segmentos diferentes dentro de una linea.
     */
     getLineSegments(line: string, iComienzo : number): string[]{
        let getSegment = (line : string, iComienzo: number)=>{
            let temp : string[] = [];
            let specialSegment : boolean = line[iComienzo] == '$';
            if(specialSegment){
                temp.push("$");
                iComienzo += 1;
            }
            while(iComienzo < line.length && line[iComienzo] != '$'){
                temp.push(line[iComienzo]);
                iComienzo += 1;
            }
            if(specialSegment){
                temp.push(line[iComienzo]);
                temp.push(line[iComienzo+1]);
                iComienzo += 2;
            }
            return {curIndex:iComienzo,segmento:temp.join("")};
        }
        let segments : string[] = [];
        let j = iComienzo;
        while(j < line.length){
            let segResult = getSegment(line,j);
            j = segResult.curIndex;
            segments.push(segResult.segmento);
        }
        return segments;
    }

    /**
     * Analiza a que clase pertenece un segmento haciendo uso de la variable de clase 'classDic'
     * @param segment Segmento de una linea
     * @returns Retorna un string que representa la clase a la que pertenece el segmento.
     */
     getSegmentClass(segment: string) : string{
        let classBelongs : string = " ";
        let found : boolean = false;
        let j : number = 0;
        while(j<segment.length && !found){
            if(segment[j] == "$"){
                classBelongs = segment[j] + segment[j+1];
                found = true;
            }
            j += 1;
        }
        let result = this.classDic.get(classBelongs);
        if(result){
            return result;
        } 
        return "default-code-dark";//Nunca va a llegar aca
    }

    /**
     * Retorna el texto de un segmento, quitando del mismo la sintaxis especial encerrada
     * entre '$' que se utiliza para que la clase pueda interpretae que tipo de 
     * clase atribuirle al segmento.
     * 
     * @param segment Segmento de una linea
     * @returns Texto de dicho segmento
     */
    getSegmentText(segment: string): string{
        let text : string[]= [];
        let j : number = 0;
        while(j<segment.length){
            text.push(segment[j]);
            if(segment[j] == "$"){
                text.pop();
                j += 1;
            }
            j+=1;
        }
        return text.join("");
    }

}