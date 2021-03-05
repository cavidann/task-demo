import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {

    statements = [
        {
            id: 1,
            company: 'A Company',
            date: '03/10/2020',
            revenue: '700000000000',
            grossProfit: '100123478000',
            ebit: '200357456000',
            ebitda: '156998345000',
            tax_expense: '7098765000',
            net_profit: '1564345000',
            tax_paid: '75567234'
        },
        {
            id: 2,
            company: 'A Company',
            date: '03/10/2021',
            revenue: '600000000000',
            grossProfit: '200123478000',
            ebit: '600357456000',
            ebitda: '256998345000',
            tax_expense: '6098765000',
            net_profit: '2564345000',
            tax_paid: '65567234'
        },
        {
            id: 3,
            company: 'A Company',
            date: '03/10/2022',
            revenue: '500000000000',
            grossProfit: '300123478000',
            ebit: '500357456000',
            ebitda: '356998345000',
            tax_expense: '5098765000',
            net_profit: '3564345000',
            tax_paid: '55567234'
        },
        {
            id: 4,
            company: 'B Company',
            date: '03/10/2023',
            revenue: '400000000000',
            grossProfit: '400123478000',
            ebit: '400357456000',
            ebitda: '456998345000',
            tax_expense: '4098765000',
            net_profit: '4564345000',
            tax_paid: '45567234'
        },
        {
            id: 5,
            company: 'B Company',
            date: '03/10/2024',
            revenue: '300000000000',
            grossProfit: '500123478000',
            ebit: '300357456000',
            ebitda: '556998345000',
            tax_expense: '3098765000',
            net_profit: '5564345000',
            tax_paid: '35567234'
        },
        {
            id: 6,
            company: 'B Company',
            date: '03/10/2025',
            revenue: '200000000000',
            grossProfit: '600123478000',
            ebit: '200357456000',
            ebitda: '656998345000',
            tax_expense: '2098765000',
            net_profit: '6564345000',
            tax_paid: '25567234'
        },
        {
            id: 7,
            company: 'A Company',
            date: '03/10/2026',
            revenue: '100000000000',
            grossProfit: '700123478000',
            ebit: '100357456000',
            ebitda: '756998345000',
            tax_expense: '1098765000',
            net_profit: '7564345000',
            tax_paid: '15567234'
        }
    ]

    statementCopy;
    constructor() {
        this.statements.reverse();
        this.statementCopy = this.cloneObj(this.statements);
    }

    getDataList(params) {
        let data;
        if (params.type === 'reset') {
            data = this.getResetedStatementList(params);
        } else if ('save') {
            data = this.getSavedStatementList(params);
        } else {
            data = this.getStatementList(params);
        }
        return data;
    }

    getStatementList(params) {
        let filtered = this.statements.filter(item => item.company === params.companyName);

        if (params.propName !== 'date') {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => a[params.propName] - b[params.propName])
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => b[params.propName] - a[params.propName])
            }
        } else {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => (new Date(a[params.propName]) as any) - (new Date(b[params.propName]) as any))
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => (new Date(b[params.propName]) as any) - (new Date(a[params.propName]) as any))
            }
        }

        if (params.search) {
            filtered = filtered.filter(function (item) {
                return JSON.stringify(item[params.propName]).toLowerCase().includes(params.search);
            });
        }

        return {
            totalItemCounts: filtered.length,
            statements: filtered.slice((+params.page - 1) * params.count, params.count + (+params.page - 1) * params.count)
        }
    }

    getResetedStatementList(params) {
        this.statements = this.statementCopy;
        this.statementCopy = this.cloneObj(this.statements);
        let filtered = this.statementCopy.filter(item => item.company === params.companyName);

        if (params.propName !== 'date') {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => a[params.propName] - b[params.propName])
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => b[params.propName] - a[params.propName])
            }
        } else {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => (new Date(a[params.propName]) as any) - (new Date(b[params.propName]) as any))
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => (new Date(b[params.propName]) as any) - (new Date(a[params.propName]) as any))
            }
        }

        if (params.search) {
            filtered = filtered.filter(function (item) {
                return JSON.stringify(item[params.propName]).toLowerCase().includes(params.search);
            });
        }

        filtered.forEach(element => {
            element.isDublicated = false;
            element.isNew = false;
            element.isDeleted = false;

            element.isIdFocused = false;
            element.isCompanyFocused = false;
            element.isDateFocused = false;
            element.isRevenueFocused = false;
            element.isGrossProfitFocused = false;
            element.isEbitFocused = false;
            element.isEbitdaFocused = false;
            element.isTax_expenseFocused = false;
            element.isNet_profitFocused = false;
            element.isTax_paidFocused = false;
        });
        return {
            totalItemCounts: filtered.length,
            statements: filtered.slice((+params.page - 1) * params.count, params.count + (+params.page - 1) * params.count)
        }
    }

    getSavedStatementList(params) {
        this.statementCopy = this.cloneObj(this.statements);
        let filtered = this.statementCopy.filter(item => item.company === params.companyName);

        if (params.propName !== 'date') {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => a[params.propName] - b[params.propName])
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => b[params.propName] - a[params.propName])
            }
        } else {
            if (params.sortType === 'ascending') {
                filtered.sort((a, b) => (new Date(a[params.propName]) as any) - (new Date(b[params.propName]) as any))
            } else if (params.sortType === 'descending') {
                filtered.sort((a, b) => (new Date(b[params.propName]) as any) - (new Date(a[params.propName]) as any))
            }
        }

        if (params.search) {
            filtered = filtered.filter(function (item) {
                return JSON.stringify(item[params.propName]).toLowerCase().includes(params.search);
            });
        }

        return {
            totalItemCounts: filtered.length,
            statements: filtered.slice((+params.page - 1) * params.count, params.count + (+params.page - 1) * params.count)
        }
    }

    deleteData(id) {
        this.statements.splice(this.statements.findIndex(item => +item.id === +id), 1);
    }

    undoData(id,data){
        this.statements.splice(this.statements.findIndex(item => +item.id === +id),0,data)
    }

    dublicateData(id) {
        let dataCopy = this.cloneObj(this.statements.find(item => +item.id === +id));
        dataCopy.id = this.statements.length + 1;
        this.statements.splice(this.statements.findIndex(item => +item.id === +id) + 1, 0, dataCopy);
    }

    cloneObj(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    updateData(data, previousDataId, id) {
        let i = this.statements.findIndex(item => +item.id === +id);
        if (i === -1) {
            this.statements.splice(this.statements.findIndex(item => item.id === +previousDataId) + 1, 0, data);
        } else {
            this.statements[i] = data;
        }
    }

    getDataId() {
        return this.statements.length + 1;
    }
}
