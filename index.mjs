import fs from 'fs/promises'
import { input } from './utils.mjs'
import { CSV } from './csv.mjs'

const fecha = new Date()

const Archivo = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}.csv`

const csv = new CSV(Archivo)

try {
    await csv.crearArchivo()
} catch (error){
    console.log("Error epico al inicializar, error: ", error.message)
}

while(true){
    console.clear()
    console.log(`
        PROYECTO 3 - CSV con Javascript
        1- Crear carpeta separada CSV
        2- Crear archivardo CSV
        3- Listar CSV
        4- Mostrar tabla
        5- Agregar producto
        6- Borrar producto
        7- Ver un meme épico
        8- Salir del programoide
        
        `)
        const opcion = await input("Seleccioná una opción: ")
        console.log("\nno me gusta hacer esto")

        if (opcion === "1"){
            await csv.crearCarpeta()
            await input("Presione una tecla para continuar...")
        }

        else if (opcion === "2"){
            await csv.crearArchivo()
            await input("Presiona una tecla para continuar chabon...")
        }

        else if (opcion === "3"){ // xd
            await csv.listarCSV()
            await input("PRESIONA UNA TECLA SI QUERES CONTINUAR (por favor no continues, por tu bien)")
        }

        else if(opcion === "4"){
            await csv.mostrarTabla()
            await input("presiona una teclovich para seguir")
        }

        else if(opcion === "5"){ //bsta por favor
            console.log("\n---- AGREGAR UN PRODUCTO ----")
            const id = await input("Ingresá el ID del producto: ")
            const producto = await input("Ingresá el nombre del producto: ")
            const stock = await input("Ingrese stock de producto: ")
            const precio = await input("Ingrese el precio: ")

            await csv.agregar(id, producto, stock, precio)
            await input("Presiona un atecla si queres seguir usando este programa")
        }
        

        else if(opcion === "6"){
            console.log("\n---- BORRAR UN PRODUCTO ----")
            await csv.mostrarTabla()
            const idBorrar = await input("Ingrese el ID del producto que desea eliminar para toda la eternidad: ")

            await csv.borrar(idBorrar)
            await input("Presione enter para cotninuar...")
        }

        else if(opcion === "7"){
            const {exec} = await import('child_process')
            exec("start https://www.youtube.com/watch?v=k8sTHtoYWL4&list=PLxqfTLq22IyboJ_4HqZVqa9egz0g-OSxA&index=16")
        }

        else if(opcion === "8"){
            console.log("chau loco cuidate, gracias por no usar más este programa")
            process.exit()
        }

        else {
            console.log("Amigo la pifiaste esa no es ninguna opcion")
            await input("Presiona una tecla para intentarlo de nuevo... (tenes que elegir del 1 al 8 chabon)")
        }

}