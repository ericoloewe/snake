/** ===================================================
 * Enumerator criado, para melhor gerenciar e
 * manipular as direções no jogo, que são:
 * - Snake
 * - Food
 * - Null
 * ===================================================*/
var Model;
(function (Model) {
    (function (WhatIsThisTypes) {
        WhatIsThisTypes[WhatIsThisTypes["Snake"] = 0] = "Snake";
        WhatIsThisTypes[WhatIsThisTypes["Food"] = 1] = "Food";
        WhatIsThisTypes[WhatIsThisTypes["Null"] = 2] = "Null";
    })(Model.WhatIsThisTypes || (Model.WhatIsThisTypes = {}));
    var WhatIsThisTypes = Model.WhatIsThisTypes;
})(Model || (Model = {}));
