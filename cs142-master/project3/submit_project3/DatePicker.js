'use strict';

class DatePicker{
  constructor(id, fn){
    this.id = id;
    this.callback = fn;
    this.months=["January", "February","March", "April","May", "June", "July", "August", "September",
    "October","November","December"];
    this.daysOfWeek = ["Su", "Mo","Tu","We","Th","Fr","Sa"];
  }
  render(date){
    //console.log("START ", date);
    let origStartDate = new Date(date.getTime());
    let parent = document.getElementById(this.id);
    let table = document.createElement("table");
    parent.appendChild(table);
    let header = table.createTHead();
    let arrowRow = header.insertRow();
    
    let leftArrowCell = arrowRow.insertCell(0);
    leftArrowCell.textContent="<";
    leftArrowCell.setAttribute("id","leftArrow");
    leftArrowCell.addEventListener("click", () => {
        table.remove();
        date.setMonth(date.getMonth() - 1);
        this.render(date);
    });

    let spaces = arrowRow.insertCell(1);
    spaces.textContent= this.months[date.getMonth()] +" " + date.getFullYear();
    spaces.colSpan="5"; 
   
    let rightArrowCell = arrowRow.insertCell(2);
    rightArrowCell.textContent=">";
    rightArrowCell.setAttribute("id","rightArrow");
    rightArrowCell.addEventListener("click", () => {
        table.remove();
        date.setMonth(date.getMonth() + 1);
        this.render(date);
    });

    let weekRow = header.insertRow();
    for (let i=0;i<this.daysOfWeek.length;i++){
      let dayCell = weekRow.insertCell(i);
      dayCell.textContent=this.daysOfWeek[i];
    }
    
    //set days. 
    let lastMonth = new Date(date.getTime()); //clone lastMonth=date
    lastMonth.setDate(0); //set lastMonth to last day of month before date
    let day_of_week = new Date(date.getFullYear(),date.getMonth(),1).getDay(); //set to first of month

    lastMonth.setDate(lastMonth.getDate()-day_of_week+1); //move lastMonth back days for printing to calendar for first week
    let add_row = table.insertRow();
    for (let i=0;i<day_of_week;i++){
      let back_cell = add_row.insertCell(i);
      back_cell.setAttribute('class',"back_cell");
      back_cell.textContent=(lastMonth.getDate()).toString();
      lastMonth.setDate(lastMonth.getDate()+1); 
    }

    //finish populating the first week
    let num_days=1;
    for(let i=day_of_week;i<this.daysOfWeek.length;i++){
      let forward_cell = add_row.insertCell(i);
      forward_cell.textContent=lastMonth.getDate();
      let saved_state = {
        month:(lastMonth.getMonth()+1).toString(),
        day:lastMonth.getDate().toString(),
        year:lastMonth.getFullYear().toString()
      };
      forward_cell.addEventListener('click',()=>{ 
        this.callback(this.id,saved_state);
      });
      this.isCurrentDay(forward_cell,origStartDate);
      num_days++;
      lastMonth.setDate(lastMonth.getDate()+1);
    }
    
    while(num_days <= this.num_days_month(date)){
      let add_row = table.insertRow();
      for (let i=0;i<this.daysOfWeek.length;i++){
        let cell_day = add_row.insertCell(i);
        
        if(num_days <= this.num_days_month(date)){
          cell_day.textContent=lastMonth.getDate();
          //console.log("3 rows:",lastMonth.getMonth()+1,lastMonth.getDate(), lastMonth.getFullYear());
          let saved_state = {
            month:(lastMonth.getMonth()+1).toString(),
            day:lastMonth.getDate().toString(),
            year:lastMonth.getFullYear().toString()
          };
          cell_day.addEventListener('click',()=>{
            this.callback(this.id,saved_state);
          });
        this.isCurrentDay(cell_day,origStartDate);
        num_days++;
        lastMonth.setDate(lastMonth.getDate()+1);
       //console.log("incrementing lastMonth ",lastMonth);
      }
    }
  }//end while

  } //end render
  //getMonths is indexed from 0, +1 to adjust. Much time spent debugging this. Poorly designed API. 
  num_days_month(date){
    return new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
  }

  isCurrentDay(cell,date){
    //are we setting current{
      //console.log('isCurrentDay cell:',cell.textContent);
      //console.log('isCurrentDay date:',date.getDate());
      if ( cell.textContent===(date.getDate().toString()) ){
          cell.setAttribute("class","current");
      }
    }

}//end class