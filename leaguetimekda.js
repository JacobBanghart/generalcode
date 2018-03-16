function Champion (name) {
        this.name = name;
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
        this.kda = 0;
        this.hours = 0;
        this.min = 0;
        this.seconds = 0;
        this.wins = 0;
        this.losses = 0;
        this.totalgames = 0;
        this.winrate = 0;
        this.calckda = function() {
            this.kda = (this.kills + (this.assists/3))/this.deaths
        }
        this.calctotalgames = function(){
            this.totalgames = this.wins + this.losses;
        }
        this.calcwinrate = function(){
            if(this.losses == 0){
                this.winrate = "100%"
            }
            else{
                this.winrate = (this.wins/this.totalgames)*100;
            }
        }
}
function dorest() {
    var champarray = [];
    var totalgames =0;
    var hours = 0;
    var min = 0;
    var seconds = 0;
    var kills = 0;
    var deaths = 0;
    var assists = 0;
    var matchhistory = document.getElementById("viewport-3").children[0].children[0].children[1].children[0].id + "-list";
    for (var i = 0; i < document.getElementById(matchhistory).children.length - 2; i++) {
        var element = document.getElementById(matchhistory).children[i];
        var nameplate = element.children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].innerHTML;
        var winplate = element.children[0].children[0].children[0].children[8];
        var inner = element.children[0].children[0].children[0].children[7].children[0].children[0].innerHTML;
        var ele2 = element.children[0].children[0].children[0].children[5].children[0];
        var killselement = ele2.children[0].innerHTML;
        var deathselement = ele2.children[1].innerHTML;
        var assistselement = ele2.children[2].innerHTML;
        var indexof = -1;
        for(var x = 0; x < champarray.length; x++){
            if(nameplate == champarray[x].name){
                indexof = x;
                x = champarray.length + 1
            }
        }
        if(indexof == -1){
            var champ = new Champion(nameplate);
            champarray.push(champ);
            indexof = champarray.length-1
        }
        if (inner.length > 5) {
            hours += parseInt(inner);
            champarray[indexof].hours += parseInt(inner);
            min += parseInt(inner[2] + inner[3]);
            champarray[indexof].min += parseInt(inner[2]+inner[3]);
            seconds += parseInt(inner[5] + inner[6]);
            champarray[indexof].seconds += parseInt(inner[5] + inner[6]);
        }
        else if (inner.length == 5) {
            min += parseInt(inner);
            champarray[indexof].min += parseInt(inner);
            seconds += parseInt(inner[3] + inner[4]);
            champarray[indexof].seconds += parseInt(inner[3]+inner[4]);
        }
        else if (inner.length == 4) {
            min += parseInt(inner);
            champarray[indexof].min += parseInt(inner);
            seconds += parseInt(inner[2] + inner[3]);
            champarray[indexof].seconds += parseInt(inner[2] + inner[3]);
        }
        if(winplate.classList[0] == "game-summary-victory"){
            champarray[indexof].wins += 1;
        }
        if(winplate.classList[0] == "game-summary-defeat"){
            champarray[indexof].losses += 1;
        }
        kills += parseInt(killselement);
        champarray[indexof].kills += parseInt(killselement);
        deaths += parseInt(deathselement);
        champarray[indexof].deaths += parseInt(deathselement);
        assists += parseInt(assistselement);
        champarray[indexof].assists += parseInt(assistselement)
        totalgames++;
    }
    console.log("Individual hours: " + hours);
    console.log("Individual minutes: " + min);
    console.log("Individual seconds: " + seconds);
    var total = seconds / 60 / 60 + min / 60 + hours;
    console.log("Totaled amount of hours: " + total);
    console.log("Totaled Days: " + total / 24);
    console.log("Kills: " + kills);
    console.log("Deaths: " + deaths);
    console.log("Assists: " + assists);
    console.log(`Overall KDA: ${kills}/${deaths}/${assists} ${(kills + (assists / 3)) / deaths}`);
    console.log("Total games "+totalgames);
    var highestkda = 0;
    var highestname = 0;
    champarray.sort(function (a,b) {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    })
    for(var y = 0; y < champarray.length; y++){
        champarray[y].calckda();
        champarray[y].calctotalgames();
        champarray[y].calcwinrate();
        if(champarray[y].kda > highestkda){
            highestname = champarray[y].name;
            highestkda = champarray[y].kda;
        }
    }
    console.log("Your highest kda champ is "+highestname);
    console.log("With a "+highestkda+" kda");
    console.log(champarray);
}
var myInval = window.setInterval(function(){
    if(document.body.scrollHeight > window.scrollY + window.innerHeight){
        window.scroll(500, document.body.scrollHeight)
    }
    else{
        clearInterval(myInval);
        console.log("Done");
        dorest();
    }
}, 3000);
