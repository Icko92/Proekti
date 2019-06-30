function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Duel(name, hp, armor) {
    this.name = name;
    this.hp = hp;
    this.armor = armor;
    this.damage = 0;

    this.addDamage = function (min, max) {
        this.damage = getRandomNumber(min, max);
    };
    
    this.fight = function(){
        var i = 0;
        while(fighter1.hp > 0 && fighter2.hp > 0) {
            if (i % 2 === 0) {
                fighter1.addDamage(23, 35);
                fighter2.hp = fighter2.hp - (fighter1.damage - fighter2.armor);
                console.log(fighter2.hp + " Human");
            } else {
                fighter2.addDamage(18, 30);
                fighter1.hp = fighter1.hp - (fighter2.damage - fighter1.armor);
                console.log(fighter1.hp + " Orc");
            };
            i++;
        }
        if(fighter2.hp <= 0){
            console.log(fighter1.name + " WIN");
        } else{
            console.log(fighter2.name + " WIN");
        }
    }
};
    var fighter1 = new Duel("Orc", 720, 5);
    var fighter2 = new Duel("Human", 550, 9);
    var duel = new Duel();
    
function startDuel(){
    duel.fight();
};



startDuel(fighter1,fighter2);





