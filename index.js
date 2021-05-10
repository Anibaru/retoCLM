//parametros de enviroment
require('dotenv').config();

//requires
const koa = require('koa');
const koaRouter = require('koa-router');
const override = require('koa-methodoverride');
const parser = require('koa-bodyparser');
const joi = require('joi');


const json = require('koa-json');

//vistas
const koaNunjucks = require('koa-nunjucks-2');
const static = require('koa-static');

const path = require('path');

const app = new koa();
const {dbConnection} = require('./db/config');

//conexion
dbConnection();

//
const router = new koaRouter();
const port = process.env.PORT;

//models
const Movie = require('./models/movie');
const { validarCampos } = require('./middlewares');
const {buscarMovie, editarPlot} = require('./controllers/movie');


//routes
router.get('/buscar', async (ctx, next) => {
    console.log('connected to buscar route');
    console.log(ctx.request.body);
    encontrar = await buscarMovie(ctx.request.body);
    console.log(encontrar);
    return await ctx.render('buscar', {
        post: encontrar
    });
});

router.get('/', async(ctx, next) => {
    console.log('connected to root route');
    return Movie.find({}, async(error,results) => {
        //console.log(results);
        await ctx.render('index',{ 
            posts: results
        });
        console.log('the view was rendered');
    });
});

router.get('/buscados', async (ctx, next) => {
    console.log('connected to registros route');
    console.log(ctx);
    return Movie.find({}, async (error, results) => {

       await ctx.render('buscados', {
            posts: results
        });
        console.log('the view was rendered');
    });
});

router.post('/buscados', async (ctx, next) => {
    console.log('connected to registros route');
    comparar = ctx.request.body;
    console.log(comparar);
    reemplazado = await editarPlot(comparar);
    return Movie.find({}, async (error, results) => {

        await ctx.render('buscados', {
             posts: results
         });
         console.log('the view was rendered');
     });
});

//middlewares
app.use(json());
app.use(override('_method'))
app.use(parser());
app.use(koaNunjucks({
    ext: 'njk',
    path: './views',
    nunjucksConfig: {
      trimBlocks: true
    }
  }));
app.use(router.routes()).use(router.allowedMethods());
app.use(static('./public'));


//puerto
app.listen(port, ()=> {
    console.log(`App iniciada en el puerto ${port}`);
});