import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetters',
  standalone: true
})
export class CaptalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    return value
      .split(' ') // Divide a string em palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras de volta em uma string
  }

}
