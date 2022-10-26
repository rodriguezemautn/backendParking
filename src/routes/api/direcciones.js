const { Router } = require('express');
const {db} = require('../../firebase');

const router = Router();

//recupera todas las direcciones
router.get('/', async (req, res) => {
    console.log(req.body);
    const querySnapshot = await db.collection("direcciones").get();

    const direcciones = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    console.log(direcciones);

    
    res.json(direcciones); //retorna json
    //res.render('direcciones', {direcciones}) //renderiza con handelbar
});

//recupera una direccion por id
router.get("/:id", async (req, res) => {
    
    console.log(req.body);

    const direccion = await db.collection('direcciones').doc(req.params.id).get()

    //randeriza con handelbar
   // res.render("direcciones", { direccion: { id: direccion.id, ...direccion.data() }});
    
    res.json(direccion.data());

   
});

//recupera una direccion por poximidad
router.get("/:calle/:entre1/:entre2" , async (req, res) => {
    console.log(req.body);
    const { calle } = req.params;   
    var callep = parseInt(calle);
    var callei = callep--;
    var callef = callep++; 
    const { entre1 } = req.params;
    var entre1p = parseInt(entre1);
    var entre1i = entre1p--;
    var entre1f = entre1p++; 
    const { entre2 } = req.params;
    var entre2p = parseInt(entre2);
    var entre2i = entre2p--;
    var entre2f = entre2p++;
    
    const querySnapshot = await db.collection('direcciones')
    .where("Calle", "in", [callei, callep, callef])	
    .where('entre1', '==', entre1)    
    .get();
    
    
    const direcciones = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    //console.log(direcciones);

    res.send(direcciones);
    //res.json(direcciones); //retorna json
    //res.render('direcciones', {direcciones}) //renderiza con handelbar
    
});

//carga una direccion nueva
router.post('/new-direccion', async (req, res ) => {
    //const { Calle, entre1, entre2, estado } = req.body
    
     //------------carga direccion-----------
    console.log(req.body);
    const direccion = await db.collection("direcciones").add({
        Calle: parseInt(req.body.Calle),
        entre1: parseInt(req.body.entre1),
        entre2: parseInt(req.body.entre2),
        estado: req.body.estado
    });
    //------------retorna message-----------------------------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion cargada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al cargar direccion"})
    } 
    //---------------------------------------------------------  
    
    //res.redirect('/') //redirecciona a localhost:3000 
})

//devuelve una direccion para su edicion 
router.get('/edit-direccion/:id', async (req, res) => {
    const doc = await db.collection('direcciones').doc(req.params.id).get()

    // renderiza la direccion de id igual al parametro en vista handelbar
    //res.render("direcciones", { direccion: { id: doc.id, ...doc.data() }});

    res.json(doc.data()) //retorna un json con una tupla direccion 
})

//borra un direccion eliminandola de la bd
router.get('/delete-direccion/:id', async (req, res) => {
    
    const doc = await db.collection('direcciones').doc(req.params.id).delete()    
    //---------------retorna menssage luego de cargar------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion borrada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al borrar"})
    } 
    //---------------------------------------

    //res.redirect('/') //redirecciona a localhost:3000
})


//actualiza todos los campos de una direccion segun su id 
router.post("/update-direccion/:id", async (req, res) => {
    
    const { id } = req.params;
    
    const direcccion = await db.collection("direcciones").doc(id).update(req.body);
    //------------actualiza direccion retorna message-----------------------------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion Actualizada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al actualizar direccion"})
    } 
    //---------------------------------------------------------    

   // res.redirect("/"); //redirecciona a localhost:3000

})




module.exports = router;