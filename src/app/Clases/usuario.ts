export class Usuario {
    Nombre!: string;
    Apellido!: string;
    Edad!: number;
    DNI!: number;
    ObraSocial!: string;
    Email!: string;
    Password!: string;
    ImagenUno!: string; //una sola imagen para especialistas
    ImagenDos!: string;
    TipoUsuario!: string;//admin,paciente,especialista
    Especialidad!: string; //solo especialistas
    EstaLogueado!:boolean;
    Id!:string;
    Aprobado!:boolean;
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
}
