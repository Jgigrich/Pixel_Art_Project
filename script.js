$(function(){
  function setDefaults(){
    if($(window).width() < 500){
      $("#columns").attr("value", "10");
    }
  }

  function confirmErase(grid){
    let d = grid.find("td"), i, len;
    for(i=0, len=d.length; i<len; i++){
      if($(d[i]).css("background-color") !== "rgb(255, 255, 255)"){
        return confirm("Erase current grid?");
      }
    }
    return true;
  }

  function checkGrid(){
    let grid = $(".grid");
    if(grid.children().length === 0 || confirmErase(grid)){
      createGrid();
    }
  }

  function createGrid(){
    let row = parseInt($("#rows").val(), 10),
        col = parseInt($("#columns").val(), 10),
       size = parseInt($("#size").val(), 10),
       grid = $(".grid"), i, j;
    grid.detach().empty();
    for(i = 0; i<row; i++){
      let tableRow = $("<tr></tr>");
      for(j = 0; j<col; j++){
        $("<td></td>")
          .css({"background-color": "rgb(255, 255, 255)","width": size, "height": size})
          .appendTo(tableRow);
      }
      tableRow.appendTo(grid);
    }
    grid.appendTo(".container");
  }

  function changeColor(event){
    event.preventDefault();
    if(event.type==="touchstart" || event.type==="touchmove" || event.buttons === 1){
      let selectedColor = $("#color").val(),
          erase = $("#erase").is(":checked");
      if(erase){
        $(this).css("background-color", "rgb(255, 255, 255)")
      }
      else{
        console.log(event);
        $(this).css("background-color", selectedColor);
      }
    }
  }

  /**********  Event Handlers  **********/
  $(".grid").on("touchenter", "td", changeColor);
  $(".grid").on("touchstart", "td", changeColor);
  $(".grid").on("mousedown", "td", changeColor);
  $(".grid").on("mouseover", "td", changeColor);
  $("#createGrid").on("click", checkGrid);

  /********** Startup **********/
  setDefaults();
  $("#createGrid").trigger("click");
});
