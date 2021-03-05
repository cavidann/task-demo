import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnInit {
  @Input() totalItems;
  @Input() goFirstPage;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onSure: EventEmitter<any> = new EventEmitter();

  // pageCountOptions = environment.pageCountOptions;
  currentItemCountPerPage = environment.paginationItemCount;

  currentPage = +window.location.pathname.split('/').pop();

  isNewed = true;

  from = 0;
  to = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getInterval();

    // localStorage.setItem('itemsPerPage', this.currentItemCountPerPage.toString());
  }

  ngOnChanges() {
    
    if (this.goFirstPage) {
      this.isNewed = false;
      setTimeout(() => {
        this.routeTo(1, false);
        this.isNewed = true;
      }, 100);
    }
  }

  getInterval() {
    this.from = this.currentPage * this.currentItemCountPerPage - this.currentItemCountPerPage + 1;
    this.to = (this.totalItems <= this.currentPage * this.currentItemCountPerPage) ? this.totalItems : (this.currentPage * this.currentItemCountPerPage);
  }

  setCurrentPageItemCount(i) {
    this.currentItemCountPerPage = i;
    // localStorage.setItem('itemsPerPage', this.currentItemCountPerPage.toString());

    this.isNewed = false;
    setTimeout(() => {
      this.routeTo(1);
      this.isNewed = true;
    }, 100);
  }

  routeTo(i, cond = true) {

    const pathname = window.location.pathname;
    const mainPath = pathname.slice(0, pathname.length - pathname.split('/').pop().length);
    if (cond){
      this.onChange.emit({ itemCountPerPage: this.currentItemCountPerPage, activePage: i })
    }
    this.router.navigate([mainPath + i]);
    // this.isNewed = true;
    this.currentPage = i;

    this.getInterval();
  }

}
