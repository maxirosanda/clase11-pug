module.exports = {
    leer : async function(fs) {
            try{
              let contenido = await fs.promises.readFile(`./productos.js`,`utf-8`)
               return contenido
            }
            catch{

                console.log([])
                
            }    
       
    }

}