
'use strict';

class TableTemplate{
  static fillIn(id,my_dict, colname){
    let table = document.getElementById(id);
    let rows = table.rows;
    
    console.log("table rows:",table.rows.length);
    //data rows start from 1, first row is header
    for (let i=0;i<table.rows.length;i++){
        console.log("table rows:",table.rows[i]);
        console.log("cell len:",table.rows[i].cells.length);
        for (let j=0;j<table.rows[i].cells.length;j++){
          console.log("cell:",table.rows[i].cells[j]);
          table.rows[i].cells[j].textContent = (new Cs142TemplateProcessor(table.rows[i].cells[j].textContent).fillIn(my_dict));
        }
    }

    if (table.style.visibility === 'hidden') {
      table.style.visibility = 'visible';
    }

  }
}