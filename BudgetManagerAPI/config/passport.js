const PassportJWT = require('passport-jwt'),
    ExtractJWT = PassportJWT.ExtractJwt,
    Strategy = PassportJWT.Strategy,
    config = require('./index.js'),
    models = require('@BugetManagerAPI/app/setup');

module.exports = (passport) => {
    const User = models.User;
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken
    };
    
    passport.use(new Strategy(parameters, (payload, done)=>{
        User.findOne({id:payload.id}, (error, user)=>{
            if(error) return done(error, false);
            if(user) done(null, user);
            else done(null, false);
        });
    }));

    module.exports = (mongoose, config) => {
        const database = mongoose.connection;
        mongoose.Promise = Promise;

        mongoose.connect(config.database, {
            useMongoClient: true,
            promiseLibrary: global.Promise,
        });
        database.on('error', error=>console.log(`Connection failed: ${error}`));
        database.on('connected', ()=>console.log('Connected to BudgetManager Databse'));
        database.on('disconnected', ()=>console.log('Disconnected from BudgetManager Database'));
        process.on('SIGINT', ()=>{
            database.close(()=> console.log('BudgetManager Databse Connection closed'));
            process.exit(0);
        });
    };
}