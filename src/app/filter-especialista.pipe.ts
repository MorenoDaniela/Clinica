import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEspecialista'
})
export class FilterEspecialistaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.Especialidad.indexOf(arg) > -1 || post.PacienteEmail.indexOf(arg) > -1
      || post.EspecialistaEmail.indexOf(arg) > -1 || post.Horario.indexOf(arg) > -1
      || post.Comentario.indexOf(arg) > -1 || post.Estado.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
