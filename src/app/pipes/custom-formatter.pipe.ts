import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'customFormatter'
})
export class CustomFormatterPipe implements PipeTransform {

  transform(val: string, ...args: any[]) {
    const format = args[0] ? '1.0-2' : '1.0-0'; 
    return this.decimalPipe.transform(val, format);
  }

  constructor(private decimalPipe: DecimalPipe) { }

}
