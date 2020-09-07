var width = 8;
var height = 9;
var grid = [];
var matches = [];
var row;
var col;

function checkMatchInitial(i,j,num){
    if (i - 1 >= 0 && i - 1 < grid.length && i - 2 >= 0 && i - 2 < grid.length){
        if (grid[i - 1][j] == num && grid[i - 2][j] == num){
            return true
        }
    }
    if (j - 1 >= 0 && j - 1 < grid.length && j - 2 >= 0 && j - 2 < grid.length){
        if (grid[i][j - 1] == num && grid[i][j - 2] == num){
            return true
        }
    }
    return false
}

function checkMatch(i,j,num){
    if (i - 1 >= 0 && i - 1 < grid.length && i - 2 >= 0 && i - 2 < grid.length){
        if (grid[i - 1][j] == num && grid[i - 2][j] == num){
            return "left"
        }
    }
    if (j - 1 >= 0 && j - 1 < grid.length && j - 2 >= 0 && j - 2 < grid.length){
        if (grid[i][j - 1] == num && grid[i][j - 2] == num){
            return "up"
        }
    }
    return false
}

function generateBoard(){
    for (i = 0; i < height; i++){
        grid.push([])
        for (j = 0; j < width; j++){
            grid[i].push(null)
        }
    }


    for (i = 0; i < height; i++){
        for (j = 0; j < width; j++){
            grid[i][j] = Math.floor(Math.random() * 6) + 1;
            //do{
            //    grid[i][j] = Math.floor(Math.random() * 6) + 1;
            //} while(checkMatchInitial(i,j,grid[i][j]))
       
        }
    }

}

function updateBoard(){

    for (i = 0; i < height; i++){
        for (j = 0; j < width; j++){
            if (i + 1 < grid.length){
                if (grid[i + 1][j] == null){
                    grid[i + 1][j] = grid[i][j]
                    grid[i][j] = null
                }
            }
            if (i == 0){
                if (grid[i][j] == null){
                    grid[i][j] = grid[i][j] = Math.floor(Math.random() * 6) + 1;
                }
            }
            
        }
    }

    if (!grid.includes(null)){
        removeMatches()
    }


    document.getElementById("board").innerHTML = '<table id="mainBoard"></table>'
    for (i = 0; i < height; i++){
        document.getElementById("mainBoard").innerHTML += '<tr id="row'+i+'"></tr>'
        for (j = 0; j < width; j++){
            row = i;
            col = j;
            document.getElementById("row"+i).innerHTML += '<td class="tile" id="col'+j+'"><img id="'+row.toString()+col.toString()+'" src="images/'+grid[i][j]+'.png" onclick="move('+row+','+col+');"></td>';
        }
    }
}

function removeMatches(){
    for (i = 0; i < height; i++){
        for (j = 0; j < width; j++){
            var checked = checkMatch(i,j,grid[i][j])
            if (checked == "left"){
                grid[i][j] = null
                grid[i - 1][j] = null
                grid[i - 2][j] = null
            }
            if (checked == "up"){
                grid[i][j] = null
                grid[i][j - 1] = null
                grid[i][j - 2] = null
            }
        }
    }
}

var selected = [];

function move(i,j){
    alert(i,j)
    if (selected.length == 0){
        selected.push(i);
        selected.push(j);
        document.getElementById(i.toString()+j.toString()).className = "clickedTile"
    }else{
        swap(selected[0],selected[1],i,j);
        selected = []
    }
}

function swap(i1, j1, i2, j2){
    var saved1 = grid[i1][j1]
    var saved2 = grid[i2][j2]
    grid[i1][j1] = saved2
    grid[i2][j2] = saved1
    document.getElementById(i1.toString()+j1.toString()).className = "tile"
    document.getElementById(i2.toString()+j2.toString()).className = "tile"
}

var main = setInterval(function() {
    updateBoard();
    document.getElementById("selected").value = selected;
}, 100);
generateBoard()


