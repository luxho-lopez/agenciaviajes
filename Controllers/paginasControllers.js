import { Viaje } from  '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'

// Muestra todos los viajes

const paginaInicio = async(req, res) => {  // req - lo que enviamos : res - lo que express responde

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    // Consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });        
    } catch (error) {
        console.log(error);
    }

};

const paginaNosotros = (req, res) => {  // req - lo que enviamos : res - lo que express responde
    res.render('nosotros', {
        pagina: "Nosotros",
    });
};

const paginaViajes = async (req, res) => {  // req - lo que enviamos : res - lo que express responde
    // Consultar DB
    const viajes = await Viaje.findAll()
    console.log(viajes);
    
    res.render('viajes', {
        pagina: "Proximos Viajes",
        viajes,
    });
};

const paginaTestimoniales = async(req, res) => {  // req - lo que enviamos : res - lo que express responde
    
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: "Testimoniales",
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

};

// Muestra viajes por su slug
const paginaDetalleViajes = async (req, res) => {  // req - lo que enviamos : res - lo que express responde
    const { slug } =  req.params;   // Destructuring de los parametros

    try {
        const viaje = await Viaje.findOne({ where : { slug } });  
        
        res.render('viaje', {
            pagina: 'Informacion del Viaje', 
            viaje
        })
    } catch (error) {
        console.log(error);
    }
};


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViajes
}