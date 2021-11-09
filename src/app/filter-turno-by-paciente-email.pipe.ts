import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTurnoByPacienteEmail'
})
export class FilterTurnoByPacienteEmailPipe implements PipeTransform {

  transform(array: any, search: any): any {
    const resultPosts = [];
    // console.log(value+" y "+arg)
    for(const post of array){
    //  console.log("aqui"+post.Turno.PacienteEmail);
      if(post.Turno.PacienteEmail == search){
       
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

  // transform(value: any, arg: any): any {
  //   const resultPosts = [];
  //   for (const post of value) {
  //     if ( post.PacienteEmail.indexOf(arg) > -1) {
  //       resultPosts.push(post);
  //     };
  //   };
  //   return resultPosts;
  // }

}
