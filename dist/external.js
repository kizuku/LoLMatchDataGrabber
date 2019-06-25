// External.js - holds external functions

function champNameFromID(IdArray) {
    var champNames = [];
    var champ;

    for (var i = 0; i < IdArray.length; i++) {
        switch(IdArray[i]) {
            case 157: champ = "Yasuo"; break; 
            case 18: champ = "Tristana"; break;
            case 45: champ = "Veigar"; break;
            case 350: champ = "Yuumi"; break;
            case 110: champ = "Varus"; break;
        }
        champNames.push(champ);
    }

    return champNames;
}