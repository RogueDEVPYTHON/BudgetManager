require('module-alias/register');
const http = require('http'),
    BudgetManagerAPI = require('@BudgetManagerAPI'),
    BudgetManagerServer = require('@BudgetManagerServer'),
    BudgetManagerPORT = process.env.PORT || 3001,
    LOCAL = '0.0.0.1';
BudgetManagerServer.listen(BudgetMangerPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${BudgetManagerPORT}`));