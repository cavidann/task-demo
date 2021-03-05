import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statement-list',
  templateUrl: './statement-list.component.html'
})
export class StatementListComponent implements OnInit {
  itemCount = 0;
  onFirstPage = false;

  page = +window.location.pathname.split('/').pop();
  count = environment.paginationItemCount;

  datas = [];

  statementForm: FormGroup;

  modalRef: BsModalRef;

  companyList = [
    { id: 0, name: 'A Company' },
    { id: 1, name: 'B Company' }
  ]

  
  selectedCompany;

  get statements() {
    return this.statementForm.get('statements') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.selectedCompany = this.companyList[0];
    this.statementForm = this.formBuilder.group({
      statements: this.formBuilder.array([])
    });
    this.getStatementList();
  }

  addStatement(isNew = false, id = -1) {
    if (id === -1) {
      this.statements.push(this.formBuilder.group({
        id: [null],
        company: [null],
        date: [null],
        revenue: [null],
        grossProfit: [null],
        ebit: [null],
        ebitda: [null],
        tax_expense: [null],
        net_profit: [null],
        tax_paid: [null],
        isNew: [isNew]
      }));
      if (isNew) {
        this.datas.push({
          id: '',
          company: '',
          date: '',
          revenue: '',
          grossProfit: '',
          ebit: '',
          ebitda: '',
          tax_expense: '',
          net_profit: '',
          tax_paid: ''
        })
      }
    } else {
      this.statements.insert(this.datas.findIndex(item => +item.id === +id) + 1, this.formBuilder.group({
        id: [null],
        company: [null],
        date: [null],
        revenue: [null],
        grossProfit: [null],
        ebit: [null],
        ebitda: [null],
        tax_expense: [null],
        net_profit: [null],
        tax_paid: [null],
        isNew: [isNew]
      }));

      let dataCopy = {
        id: '',
        company: '',
        date: '',
        revenue: '',
        grossProfit: '',
        ebit: '',
        ebitda: '',
        tax_expense: '',
        net_profit: '',
        tax_paid: ''
      }

      this.datas.splice(this.datas.findIndex(item => +item.id === +id) + 1, 0, dataCopy)
    }
  }

  toggleToFirstPage() {
    this.onFirstPage = !this.onFirstPage;
    setTimeout(() => {
      this.onFirstPage = !this.onFirstPage;
    }, 100);
  }

  toggleSortType(propName){
    this.propName=propName;
    console.log(this.sortType);
    
    if(this.sortType==='descending'){
      this.sortType = 'ascending';
    } else if(this.sortType==='ascending'){
      this.sortType = 'descending';
    }
  }

  changeSearchText(e){
    setTimeout(() => {
      if(e){
        if(e.target){
          this.search=e.target.value;
        } else {
          this.search = this.getDMY(e);
        }
      } else {
        this.search = '';
      }
      this.getStatementList();
    }, 0);
  }

  hasChanges = false;
  sortType = 'descending';
  propName="id";
  search='';
  getStatementList(type = '') {
    const params = {
      page: this.page,
      count: this.count,
      type,
      companyName: this.selectedCompany.name,
      sortType: this.sortType,
      propName: this.propName,
      search:this.search
    }

    console.log(params);
    

    if (!this.hasChanges) {
      let processedData = this.dataService.getDataList(params);
      this.datas = processedData.statements;
      this.itemCount = processedData.totalItemCounts;

      this.updateFormArray();
    } else {
      this.openSureModal();
    }

  }

  getStatement(i) {
    return this.statements.controls[i]
  }

  deleteData(id) {
    this.hasChanges = true;
    let data = this.datas.find(item => +item.id === +id);
    data.isDeleted = true;
    data.isDublicated = false;
    data.isNew = false;

    this.dataService.deleteData(id);
    // this.getStatementList()
  }

  dublicateData(id) {
    this.hasChanges = true;
    let dataCopy = this.dataService.cloneObj(this.datas.find(item => +item.id === +id));
    dataCopy.id = this.dataService.statements.length + 1;
    dataCopy.isDublicated = true;
    dataCopy.isNew = false;
    dataCopy.isDeleted = false;
    this.datas.splice(this.datas.findIndex(item => +item.id === +id) + 1, 0, dataCopy);

    this.updateFormArray();
    this.dataService.dublicateData(id);
    // this.getStatementList()
  }

  updateFormArray() {
    this.statements.clear()
    this.datas.forEach((element, i) => {
      this.addStatement();

      this.getStatement(i).get('id').setValue(element.id);
      this.getStatement(i).get('company').setValue(element.company);
      this.getStatement(i).get('date').setValue(element.date);
      this.getStatement(i).get('revenue').setValue(element.revenue);
      this.getStatement(i).get('grossProfit').setValue(element.grossProfit);
      this.getStatement(i).get('ebit').setValue(element.ebit);
      this.getStatement(i).get('ebitda').setValue(element.ebitda);
      this.getStatement(i).get('tax_expense').setValue(element.tax_expense);
      this.getStatement(i).get('net_profit').setValue(element.net_profit);
      this.getStatement(i).get('tax_paid').setValue(element.tax_paid);
    });
  }

  selectedRowIndex = -1;
  isOpenChange(e) {
    if (!e) {
      this.selectedRowIndex = -1
    }
  }

  onShown(i) {
    setTimeout(() => {
      this.selectedRowIndex = i;
    }, 0);
  }

  updateRow(data, pointIndex, id) {
    this.hasChanges = true;
    setTimeout(() => {
      
      if (this.getStatement(pointIndex - 1)) {
        this.dataService.updateData(data.value, this.getStatement(pointIndex - 1).get('id').value, +id);
      } else {
        this.dataService.updateData(data.value, this.getStatement(pointIndex).get('id').value, +id);
      }
    }, 0);
  }

  save() {
    this.hasChanges = false;
    this.getStatementList('save');
  }

  openSureModal() {
    Swal.fire({
      title: 'Etdiyiniz Deyisiklikler Yadda Saxlansin?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '##476EE2',
      cancelButtonColor: '#ea4d5c',
      confirmButtonText: 'Beli'
    }).then((result) => {
      this.hasChanges = false;
      if (result.isConfirmed) {
        this.getStatementList('save');
        Swal.fire(
          'Yadda Saxlandi!',
          '',
          'success'
        )
      } else {
        this.getStatementList('reset');
      }
    })
  }

  filter(propName){
    this.toggleToFirstPage();
    this.page=1;
    this.toggleSortType(propName);
    this.getStatementList()
  }

  searchTxt(propName, e){
    this.toggleToFirstPage();
    this.page=1;
    this.propName=propName;
    this.changeSearchText(e);
  }

  companyFilterDropdown=false;
  isDateFilterShown=false;
  getDMY(date){
    if (date) {
      const date1 = new Date(date)
      return  (+date1.getMonth() + 1) + '/' + date1.getDate() + '/' + date1.getFullYear();
    }
    return '';
  }

}


// ID unique olmalidir ve company name required olmalidir