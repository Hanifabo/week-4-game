var attackerId ="";
var defendentId ="";
var counter =0;
var weHaveAWinner = false;
var attackerlifeValue =0;
var defenderlifeValue =0;
var defendentfighterID ="";
var fighterName="";
var DeffighterName ="";
var attackScoreValueSelector ="";
var defendScoreValueselector="";

$(document).ready(function(){
    $(init);

    //called when click event is fired
    $(".character").on('click', function () {
        ++counter;

        //get the selected fighters id value
        var characterSelector = $(this).attr('id');
        //alert("The Grab ID: "+characterSelector);

        // grabs the alt value and append it to the factsboard
        var fighterfacts = $(this).children().attr("alt");


        if(counter===1){
            attackScoreValueSelector = "#"+$(this).find(".numbering").attr('id');
            attackerId  =fighterfacts;
            attackerfighterID = "#"+characterSelector;
            fighterName =fighterfacts.split("<br>")[0];
            $(".btnstart").hide();
            $(".selectEnemie").show();
           // alert("Attacker Selected power: "+attackerId.split("#")[1]);
        }
        else  if(counter===2){
            defendentId  =fighterfacts;
            DeffighterName =fighterfacts.split("<br>")[0];
            defendScoreValueselector = "#"+$(this).find(".numbering").attr('id');
            $(".compFightName").text(DeffighterName);
            defendentfighterID = "#"+characterSelector;
           //alert("The Grab ID: "+defendentfighterID);
            $(".btnstart").show();
            $(".selectEnemie").hide();
        }

        else {
            defendentId  =fighterfacts;
            DeffighterName =fighterfacts.split("<br>")[0];
            defendScoreValueselector = "#"+$(this).find(".numbering").attr('id');
            $(".compFightName").text(DeffighterName);
            defendentfighterID = "#"+characterSelector;
            //alert("The Grab ID: "+defendentfighterID);
            $(".btnstart").show();
            $(".selectEnemie").hide();
        }

        $(".pname").text(fighterfacts);
        $(".pname").show();

        // move the selected fight to the playboard
        $(this).detach().prependTo(".figtherlist ul");
        $(this).attr('class', 'fighterSlected');
       // $(this).removeClass().addClass("fighterSlected");

        //display gif images for selected fighter
        switch (characterSelector){
            case "zero":{
                $("img.motionchar").attr("src","./assets/images/kitana.gif");
                $("img.motionchar").show();
                break;
            }

            case "one":{
                $("img.motionchar").attr("src","./assets/images/kung_lao.gif");
               // $('#one').width(700); // Units are assumed to be pixels
               // $('#one').height(700);
                $("img.motionchar").show();
                break;
            }

            case "two":{
                $("img.motionchar").attr("src","./assets/images/raiden.gif");
                $("img.motionchar").show();
                break;
            }

            case "three":{
                $("img.motionchar").attr("src","./assets/images/sonya.gif");
                $("img.motionchar").show();
                break;
            }

            case "four":{
                $("img.motionchar").attr("src","./assets/images/sub_zero.gif");
                $("img.motionchar").show();
                break;
            }

        }

        //show the fighting board
        $("fightboard").show();

        // move the rest of the fighters to the opponent section
        removerCharacterList();

        //hide the fighter selection board
        $("fieldset").hide();
        $(".selectChar").show();
        //show the fightboard
        $(".fightboard").show();

    });

    $(".btnstart").on('click',function() {
        var  attInt = attackerId.split("#")[1];
        attackerlifeValue= parseInt(attInt);
        //alert("Attacking power: "+attackerlifeValue);

        // get the defendant value
        var defenderInt =  defendentId.split("#")[1];
        defenderlifeValue =  parseInt(defenderInt);
        //  alert("Defending Power: "+defenderlifeValue);

        $(".selectChar").hide();
        $(this).hide();
        $(".btnattack").show();
        $(".scoreboard").show();
    });

    $(".btnattack").on('click',function() {

        attackScoreValidator();
        $(".secondContChild").show();
    });

    $(".btnplayagin").on('click',function() {
        init();
         attackScoreValueSelector ="";
         defendScoreValueselector="";
         weHaveAWinner = false;
        location.reload();
        $(".selectEnemie").show();
        //$(".btnstart").show();

    });

    $(".winnannounce").on('click',function() {
        $(".winnannounce").hide();
        location.reload();

    });
});


// this cleans the board on pageload
function init() {
    //   $(".selectChar").hide();
    $("img.motionchar").hide();
    $(".pname").hide();
    $(".selectedFighter").text("Pick Your Fighter Above");

    //this hides the fightboard untill a player is selected
    $(".scoreboard").hide();
    $(".fightboard").hide();
    $(".fightingGround").hide();
    $(".selectChar").hide();
    $(".btnattack").hide();
     attackerId ="";
     defendentId ="";
     counter =0;
     weHaveAWinner = false;
     attackerlifeValue =0;
     defenderlifeValue =0;
     defendentfighterID ="";
    $(".secondContChild").hide();
    $(".btnplayagin").hide();
    $(".winnannounce").hide();
}

function removerCharacterList() {
    $( ".character" ).each(function() {
        $(this).detach().appendTo(".enemyCharacter ul");
        $(this).removeClass().addClass("defendCharacters");
    });
}

//attack button
function attackScoreValidator(){

    if(weHaveAWinner === true){

    }
    else{
        //  var character = prompt("pleas enter your playe name");
        var attackLevel = fighterAttackLevel();
        var defendLevel = defenderAttackLevel();
        $("#attackPower").text(attackLevel);
        $("#deffPower").text(defendLevel);

        // checks the attack level values of both and subtracts the highest level from the lowest level life-value
        if(attackLevel < defendLevel){
            // subtract the defender points from the attackers
            attackerlifeValue = attackerlifeValue - defendLevel;
            //console.log("Im here is subtraction happening, this is the attackerlifeValue: "+attackerlifeValue);
        }

        else if(attackLevel > defendLevel){
            defenderlifeValue = defenderlifeValue - attackLevel;
        }

        else if(fighterAttackLevel == defenderAttackLevel){
            console.log("equal powers");
        }
        $(attackScoreValueSelector).text(attackerlifeValue);
        $(defendScoreValueselector).text(defenderlifeValue);


        if(attackerlifeValue <= 0){
            weHaveAWinner= true;
            $(attackerfighterID).remove();
            $(".btnattack").hide();
            $(".scoreboard").hide();
            $("#defendentfighterID").off("click");
            $(".winnannounce").text(DeffighterName+" WINS!!!  click to play again");
            $(".winnannounce").show();
            $(".fightboard, .defendCharacters, .character, .fighterSlected ").off("click");

        } else if(defenderlifeValue <=0){
            weHaveAWinner = true;
            $(defendentfighterID).remove();
            $("#attackerfighterID").off("click");
            $(".btnattack").hide();
            $(".scoreboard").hide();
            $(".winnannounce").text(fighterName+" WINS!!! click to play again");
            $(".winnannounce").show();
            $(".fightboard, .defendCharacters, .character, .fighterSlected ").off("click");



        }
    }

};

function fighterAttackLevel(){
    //the attacker punch  power
    var power =0;
    var numbers = [ 15, 2, 34, 4, 45, 6, 7, 68, 9, 10 ];
    numbers.sort( function() { return Math.random() - .5 } );

    for ( var i=0; i<10; i++ ) {
        power = numbers[i];
        if(power > 0){
            break;
        }

    }
    return power;
};

function defenderAttackLevel(){
    //the defendant punch  power
    var power =0;
    var numbers = [ 15, 2, 34, 4, 45, 6, 7, 68, 9, 10 ];
    numbers.sort( function() { return Math.random() - .5 } );

    for ( var i=0; i<10; i++ ) {
        power = numbers[i];
        if(power > 0){
            break;
        }

    }
    return power;
};