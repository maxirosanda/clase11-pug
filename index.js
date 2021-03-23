const fs = require('fs')
const express = require('express')
var moduloLeer= require('./moduloLeer');
var moduloGuardar= require('./moduloGuardar');
var moduloActualizar =require('./moduloActualizar')
var moduloBorrar = require('./moduloBorrar')
const app = express()
var router = express.Router()
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var arreglo=[]

//-----------------------Lista------------------------------------------------
moduloLeer.leer(fs).then(guardados=>{

  if(guardados) arreglo = JSON.parse(guardados)

  router.get('/productos/vista', function (req, res) {
    res.render('pages/lista', {arreglo:arreglo});
  })
//------------------------- formulario vista------------------------------
router.get('/productos', function (req, res) {
  res.render('pages/formulario')
})
//-----------------------Producto individual------------------------------------

 router.get('/listar/:id', function (req, res) {
    let id = parseInt(req.params.id)
    let existe =false
    arreglo.forEach((element,index) =>{
      if (element.id == id){
        res.status(200).json(arreglo[index])   
        existe=true  
      }    

  })
  if(!existe){
    return res.status(400).json({"error": "Producto no encontrado"});
}
    
  })


})


//------------------------------Guardar---------------------------------------


router.post('/productos/', function (req, res) {
    moduloGuardar.guardar(req.body.nombre,req.body.precio,req.body.url,fs)
    res.status(200).redirect('/api/productos/')
  })

//------------------------------Actualizar---------------------------------------


router.put('/productos/:id', function (req, res) {
  moduloActualizar.actualizar(req.body.nombre,req.body.precio,req.body.url,parseInt(req.params.id),fs)
  res.status(200).json("actualizado")
})

//-------------------------------Borrar-------------------------------------
router.delete('/productos/borrar/:id', function (req, res) {
 moduloBorrar.borrar(parseInt(req.params.id),fs)

    res.status(200).json("Borrado")  
})
//---------------------------------------------------------------------------
app.use('/api',router)
app.use('/public', express.static(__dirname + 'public'));
const port = 8080 
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  server.on("error",error =>console.log(`error en servidor ${error}`))

