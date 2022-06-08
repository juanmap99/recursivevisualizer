import { CodeLine } from "./CodeLine";

export class Code{
    lineas : CodeLine[];
    codeToCopy : string;

    constructor(){
        this.lineas = [];
        this.codeToCopy = "";
    }

    setRawCode(data : string){
        this.codeToCopy = data;
    }

    /**
     * Carga las lineas de codigo en base a la data
     * @param data String que surge de leer un archivo .txt
     */
    loadFromData(data : string){
        let codeLines : string[] = data.split("\n");
        let j = 0;
        while(j < codeLines.length){
            let codeLine : CodeLine = new CodeLine();
            codeLine.loadLine(codeLines[j]);
            this.lineas.push(codeLine);
            j += 1;
        }
    }

    activateFocusOnLine(numeroLinea : number){
        this.lineas[numeroLinea].activateFocus();
    }

    desactivateFocusOnLine(numeroLinea : number){
        this.lineas[numeroLinea].desactivateFocus();
    }

}