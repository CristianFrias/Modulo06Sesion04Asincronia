import { consultarPersonaje } from "./utils.js";
import { writeFile, appendFile, readFile, unlink, readFileSync, writeFileSync } from "fs"; // fs es una dependencia nativa de Node.js

(async () => {
    // Ejemplo de proceso asíncrono
    // for (let index = 1; index <= 10; index++) {
    //     consultarPersonaje(index).then(response => {
    //         console.log(response);
    //     }) 
    // }

    // Ejemplo de proceso síncrono
    // for (let index = 1; index <= 10; index++) {
    //     const response = await consultarPersonaje(index)
    //     console.log(response);
    // }

    // Ejemplo de Promise.all
    const promesas = []
    for (let index = 11; index <=20; index++) {
        const peticion = consultarPersonaje(index)
        promesas.push(peticion)
    }
    const responses = await Promise.allSettled(promesas)

    const contenidoString = readFileSync("files/personajes.txt","utf-8")
    const contenidoObject = JSON.parse(contenidoString)
    
    for (const resp of responses) {
        if(resp.status === 'rejected') {
            continue;
        } 
        const { name, height, mass } = resp.value
        const personaje = {name, height, mass}
        contenidoObject.push(personaje)
    }

    writeFileSync("files/personajes.txt", JSON.stringify(contenidoObject),"utf-8")

    // Escritura en archivo sustituyendo lo ya existente
    // writeFile("files/personas.txt", "Texto de Prueba", "utf-8", (data) => console.log(data))

    // Escritura en archivo manteniendo lo ya existente y escribiendo al final
    // appendFile("files/personas.txt", "\n\nTexto de Prueba", "utf-8", (data) => console.log(data))

    // Ejemplo de lectura de archivo
    // readFile("files/personas.txt", "utf-8", (error, data) => {
    //     if (error) {
    //         console.log("Ocurrio un error en la lectura");
    //     } else {
    //     console.log(data);
    //     }
    // })

    // Ejemplo de eliminación de archivo
    // unlink ("files/personas.txt", () => {
    //     console.log("Archivo eliminado");
    // })
})()