var myInval = window.setInterval(function(){
    if(document.body.scrollHeight > window.scrollY + window.innerHeight){
        window.scroll(500, document.body.scrollHeight)
    }
    else{
        clearInterval(myInval);
        console.log("Done")
        dorest();
    }
}, 3000);
function dorest() {
    var hours = 0;
    var min = 0;
    var seconds = 0;
    var kills = 0;
    var deaths = 0;
    var assists = 0;
    var matchhistory = document.getElementById("viewport-3").children[0].children[0].children[1].children[0].id + "-list";
    for (var i = 0; i < document.getElementById(matchhistory).children.length - 2; i++) {
        var element = document.getElementById(matchhistory).children[i];
        var ele2 = element.children[0].children[0].children[0].children[5].children[0]
        var killselement = ele2.children[0].innerHTML;
        var deathselement = ele2.children[1].innerHTML;
        var assistselement = ele2.children[2].innerHTML;
        var inner = element.children[0].children[0].children[0].children[7].children[0].children[0].innerHTML;
        if (inner.length > 5) {
            hours += parseInt(inner);
            min += parseInt(inner[2] + inner[3]);
            seconds += parseInt(inner[5] + inner[6])
        }
        else if (inner.length == 5) {
            min += parseInt(inner);
            seconds += parseInt(inner[3] + inner[4])
        }
        else if (inner.length == 4) {
            min += parseInt(inner);
            seconds += parseInt(inner[2] + inner[3])
        }
        kills += parseInt(killselement);
        deaths += parseInt(deathselement);
        assists += parseInt(assistselement);
    }
    console.log("Individual hours: " + hours);
    console.log("Individual minuets: " + min);
    console.log("Individual seconds: " + seconds);
    var total = seconds / 60 / 60 + min / 60 + hours;
    console.log("Totaled amount of hours: " + total);
    console.log("Totaled Days: " + total / 24);
    console.log("Kills: " + kills);
    console.log("Deaths: " + deaths);
    console.log("Assists: " + assists);
    console.log(`Overall KDA: ${kills}/${deaths}/${assists} ${(kills + (assists / 3)) / deaths}`);
}