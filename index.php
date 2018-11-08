<?php
session_start();
$action = filter_input(INPUT_POST, 'action');
$hands = filter_input(INPUT_POST, "hands", FILTER_VALIDATE_INT);
include "view/header.php";
include "model/processstrat.php";
if(count($_POST) > 10){
$_SESSION["playerstrat"] = processstrat($_POST);
}
$basichard = [
    //hit = 0, stand = 1, double = 2
    [0,0,0,0,0,0,0,0,0,0],//4-8
    [0,2,2,2,2,0,0,0,0,0],//9
    [2,2,2,2,2,2,2,2,0,0],//10
    [2,2,2,2,2,2,2,2,2,2],//11
    [0,0,1,1,1,0,0,0,0,0],//12
    [1,1,1,1,1,0,0,0,0,0],//13
    [1,1,1,1,1,0,0,0,0,0],//14
    [1,1,1,1,1,0,0,0,0,0],//15
    [1,1,1,1,1,0,0,0,0,0],//16
    [1,1,1,1,1,1,1,1,1,1],//17
    [1,1,1,1,1,1,1,1,1,1]//18+
];
$basicsoft = [
    //hit = 0, stand = 1, double = 2
    [0,0,0,2,2,0,0,0,0,0],//13
    [0,0,0,2,2,0,0,0,0,0],//14
    [0,0,2,2,2,0,0,0,0,0],//15
    [0,0,2,2,2,0,0,0,0,0],//16
    [0,2,2,2,2,0,0,0,0,0],//17
    [2,2,2,2,2,1,1,1,1,1],//18
    [1,1,1,1,2,1,1,1,1,1],//19
    [1,1,1,1,1,1,1,1,1,1]//20+
];
$basicsplit = [
    //hit = 0, stand = 1, double = 2, split = 3
    [3,3,3,3,3,3,0,0,0,0],//2,2
    [3,3,3,3,3,3,0,0,0,0],//3,3
    [0,0,0,3,3,0,0,0,0,0],//4,4
    [3,3,3,3,3,0,0,0,0,0],//6,6
    [3,3,3,3,3,3,0,0,0,0],//7,7
    [3,3,3,3,3,3,3,3,3,3],//8,8
    [3,3,3,3,3,1,3,3,1,1],//9,9
    [3,3,3,3,3,3,3,3,3,3]//A,A
];

if(!isset($action)){
    $basichards = $basichard;
    $basicsofts = $basicsoft;
    $basicsplits = $basicsplit;
    include "view/setstrat.php";
}
elseif ($action == "dostrat"){
    include 'model/Card.php';
    include 'model/Deck.php';
    include 'model/Player.php';
    include "model/Dealer.php";
    $mydealer = new Dealer(5, 10);
    $players = [new Player(1000, 10)];
    $mydealer->newDeck(6);
    $wins = 0;
    $losses = 0;
    $pushes = 0;
    for($i = 0 ; $i < $hands; $i++) {
        $mydealer->startGame($players, $mydealer);
        foreach ($players as $player) {
            $player->action($mydealer);
        }
        $stillin = [];
        foreach ($players as $player) {
            if ($player->totalValue($player->cards) < 22) {
                array_push($stillin, $player);
            } else {
                $player->lostHand();
                $losses++;
            }
        }
        $mydealer->flipcard();
        if (count($stillin) > 0) {
            $mydealer->action($mydealer);

            $dealercardVals = $mydealer->totalValue($mydealer->cards);
            if ($dealercardVals > 21) {
                foreach ($stillin as $player) {
                    $player->wonHand();
                    $wins++;
                }
            } else {
                foreach ($stillin as $player) {
                    if ($dealercardVals > $player->totalValue($player->cards)) {
                        $player->lostHand();
                        $losses++;
                    } elseif ($dealercardVals == $player->totalValue($player->cards)) {
                        $player->pushedHand();
                        $pushes++;
                    } else {
                        $player->wonHand();
                        $wins++;
                    }
                }
            }
        }
        $mydealer->cleanHand();
        if($mydealer->endofshoe){
            $mydealer->shuffleShoe();
        }
    }
    include 'view/results.php';

    }
elseif ($action == "viewstrat"){
    if(!isset($_SESSION['playerstrat']))
    {
        $basichards = $basichard;
        $basicsofts = $basicsoft;
        $basicsplits = $basicsplit;
    }
    else{
        $basichards = $_SESSION['playerstrat']["hards"];
        $basicsofts = $_SESSION['playerstrat']["softs"];
        $basicsplits = $_SESSION['playerstrat']["splits"];
    }

    include "view/setstrat.php";
}
?>






<?php
include "view/footer.php";
?>
