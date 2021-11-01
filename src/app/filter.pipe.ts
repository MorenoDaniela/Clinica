import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.Especialidad.indexOf(arg) > -1 || post.EspecialistaEmail.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
