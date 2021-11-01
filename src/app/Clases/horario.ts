export class Horario {
    Lunes! : boolean;
    Martes! : boolean;
     Miercoles! : boolean;
     Jueves! : boolean;
     Viernes! : boolean;
     Sabado! :boolean;
     Desde! : string;
     Hasta! : string;
     DesdeSabado! : string;
     HastaSabado!: string;

     constructor(lunes:boolean,martes:boolean,miercoles:boolean,jueves:boolean,viernes:boolean,sabado:boolean,desde:string,hasta:string,
        desdesabado:string,hastasabado:string){
            this.Lunes=lunes;
            this.Martes=martes;
            this.Miercoles=miercoles;
            this.Viernes=viernes;
            this.Jueves=jueves;
            this.Sabado=sabado;
            this.Desde=desde;
            this.DesdeSabado=desdesabado;
            this.Hasta=hasta;
            this.HastaSabado=hastasabado;
        }
}
