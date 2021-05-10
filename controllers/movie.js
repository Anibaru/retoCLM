const Movie = require('../models/movie');
const axios = require('axios');
const { findByIdAndUpdate } = require('../models/movie');

    const buscarMovie = async(movie) => {
        //console.log(movie.t);
        //console.log(movie.y);
        //peticion http
      
        try {
            const response = await axios.get(`http://www.omdbapi.com/?t=${movie.t}&apikey=${process.env.OMDBAPIKEY}&y=${ movie.y}`);
            //console.log(response);
                //console.log(response.data);
                const Title = movie.t;
                const Year = movie.y;
                if(response.data.Error){
                    return {Title, Year, msg:'Los datos se ingresaron mal'};
                }else if (response.data){
                    const {Title, Year, Released, Genre, Director, Actors, Plot, Ratings} = response.data;
                    nuevoReg = new Movie({Title, Year, Released, Genre, Director, Actors, Plot, Ratings});
                    console.log(nuevoReg);
            //verificar si el registro ya existe
                    const existe = await Movie.findOne({Title});
                    if(existe){
                    return {Title, Year, msg:'Pelicula ya registrada'};
                    } else {
                    //guardamos
                    nuevoReg.save();
                    return {Title, Year, msg:'Pelicula agregada'};
                    }
                }
            } catch (error) {
            console.log('No se encontro nada');
            console.error(error);
          }
        
    }

    const editarPlot = async(comparar) =>{
        const {pelicula, palabra, cambiar} = comparar;
        try { const moviesdb = Movie.find({}, async (error, results) => {
            results.forEach(async element => {
                //console.log(element.Title);
                const titulo = element.Title;
                const {_id} = element._id;
                if(titulo.toLowerCase().includes(pelicula)){
                    console.log(`se encontro pelicula con coiencidencia: ${pelicula}`);
                    const buscar = element.Plot.toLowerCase();
                    if(buscar.includes(palabra)){
                        console.log('se encontro la palabra');
                        //reemplazamos
                        reemplazar = buscar.replace(palabra, cambiar);
                        console.log(reemplazar);
                        const movie = Movie.findByIdAndUpdate(_id, {Plot: reemplazar});
                        return movie;
                    }else{
                        console.log('No se encontro la palabra');
                }
                    
                }else{
                    console.log('No se encontro la pelicula');
                }
                });
            });
            }
            catch (error) {
                console.log('No se edito nada');
            }
        }
        
    

module.exports = {buscarMovie, editarPlot};