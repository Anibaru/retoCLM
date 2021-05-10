const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = mongoose.Schema({
    Title:{
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    Year:{
        type: Number
    },
    Released:{
        type: String
    },
    Genre:{
        type: String
    },
    Director:{
        type: String
    },
    Actors:{
        type: String
    },
    Plot:{
        type: String
    },
    Ratings:{
        type: Array
    }
    
});

MovieSchema.plugin(mongoosePaginate);
const movieModel = mongoose.model('Movie', MovieSchema);

const options = {
    page: 1,
    limit: 5,
}

movieModel.paginate({}, options, async (error, result) =>{await result}).then({});




MovieSchema.methods.toJSON = function(){
    const {Title, Year, Released, Genre, Director, Actors, Plot, Ratings} = this.toObject();
    return {Title, Year, Released, Genre, Director, Actors, Plot, Ratings};
}

module.exports = movieModel;