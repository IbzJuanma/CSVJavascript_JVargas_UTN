import fs from "fs/promises"
import { input } from './utils.mjs'

const archivo = "datos.csv"
const fecha = new Date()

try {
    await fs.writeFile(`./csv/${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}.csv`, "ID,Producto,Stock,Precio\n")

    console.log("ha sido creado el archivo.csv")
} catch {
    // await fs.mkdir("csv")
}
// fs.readdir("./csv") `Lee` un directorio/carpeta
// fs.readFile(nombrefile)
// fs.writeFile(nombrefile, datos)
// fs.appendFile(nombrefile, datos)
// fs.unlink(nombrefile)
// fs.

while (true){
    console.log(`
        PROYECTO 3 - CSV con Javascript
        1- Crear carpeta separada csv
        2- Crear archivo csv
        3- Listar csv
        4- Salir del programa

    `)

    const opcion = await input("Seleccione una opción: ")

    if (opcion === "1"){

    }
    
    else if (opcion === "2"){

    }

    else if (opcion === "3"){

    }

    else if (opcion === "4"){
        console.log("Chau loco cuidate.")
        process.exit()
    }
}