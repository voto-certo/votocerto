import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCnpj',
  standalone: true
})
export class FormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (value.length !== 14) {
      return value; // Retorna o valor original se o tamanho for diferente de 14
    }

    // Formata o CNPJ
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

}
