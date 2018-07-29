import { Pipe, PipeTransform } from '@angular/core';
import { Deposit } from './deposit.model';

@Pipe({
  name: 'orderDeposit'
})
export class OrderDepositPipe implements PipeTransform {

  transform(items: Deposit[]): Deposit[] {
    return items.sort( (a, b) => {
      if ( a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
