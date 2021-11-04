import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTurnos'
})
export class FilterTurnosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.indexOf(arg) <= -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
