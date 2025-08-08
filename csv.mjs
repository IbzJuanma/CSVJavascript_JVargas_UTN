import fs from "fs/promises"

export class CSV {
    constructor(Archivo){
        this.archivo = Archivo
        this.carpeta = "./csv"
        this.rutaCompleta = `${this.carpeta}/${this.archivo}`
    }

    async crearCarpeta(){
        try {
            await fs.mkdir(this.carpeta)
            console.log("La Carpeta CSV creada epicamente bien.")
        } catch(error){
            if(error.code === "EEXIST"){
                console.log("La Carpeta CSV ya existe amigo!")
            } else { console.log("Error epico al crear la carpeta, error: ", error.message)}
        }
    }

    async crearArchivo(){
        try {
            await this.crearCarpeta()
            await fs.writeFile(this.rutaCompleta, "ID,Producto,Stock,Precio\n")
        } catch (error) {
            console.log("Error epico al crear el archivo, error: ", error.message)
        }
    }

    async leer(){
        try {
            const contenido = await fs.readFile(this.rutaCompleta, 'utf8')
            const lineas = contenido.trim().split('\n')

            if (lineas.length <= 1){
                console.log("No hay ningun producto en el archivo")
                return[]
            }

            const headers = lineas[0].split(',')
            const productos = []

            for (let i = 1; i < lineas.length; i++){
                const valores = lineas[i].split(',')
                const producto = {
                    ID: valores[0],
                    Producto: valores[1],
                    Stock: valores[2],
                    Precio: valores[3],
                }
                productos.push(producto)
            }

            return productos
        } catch (error){
            console.log("Error epico al querer leer el archivo, error: ", error.message)
            return[]
        }
    }


    async agregar(id, producto, stock, precio){
        try {
            const nuevaLinea = `${id},${producto},${stock},${precio}\n`
            await fs.appendFile(this.rutaCompleta, nuevaLinea)
            console.log("Productovich agregado epicamente bien")
        } catch (error){
            console.log("Error epico al querer agregar un producto, error: ", error.message)
        }
    }


    async borrar(idBorrar){
        try{
            const productos = await this.leer()
            const productosFiltrados = productos.filter(p => p.ID !== idBorrar)

            if (productos.length === productosFiltrados.length){
                console.log("No se encontró ningun productoide con ese ID")
                return
            }

            let contenido = "ID,Producto,Stock,Precio\n"
            for (const prod of productosFiltrados){
                contenido += `${prod.ID},${prod.Producto},${prod.Stock},${prod.Precio}\n`
            }

            await fs.writeFile(this.rutaCompleta, contenido)
            console.log("El producto ha sido borrado epicamente")
        } catch (error){
            console.log("Error epico al querer borrar el producto, error: ", error.message)
        }
    }



    async mostrarTabla(){
        const productos = await this.leer()

        if (productos.length === 0){
            console.log("No hay productos para mostrar")
                return
        }

        console.log("\n=== TABLA DE PRODUCTOS ===")
        console.log("ID\t| Producto\t| Stock\t| Precio")
        console.log("----------------------------------------")
        
        for (const prod of productos) {
            console.log(`${prod.ID}\t| ${prod.Producto}\t| ${prod.Stock}\t| $${prod.Precio}`)
        }
        console.log("----------------------------------------\n")
    }


    async listarCSV() {
        try {
            const archivos = await fs.readdir(this.carpeta)
            const csvs = archivos.filter(archivo => archivo.endsWith('.csv'))

            if(csvs.length === 0){
                console.log("No hay ningun archivo CSV en la carpeta")
                return
            }

            console.log("\n----- ARCHIVOS CSV DISPONIBLES -----")
            csvs.forEach((archivo, index) => {
                console.log(`${index + 1}. ${archivo}`)
            })
            console.log("-------------------------------------\n")
        } catch (error){
            console.log("Errorr epico al querer listar los archivos CSV, error: ", error.message)
        }
    }
}