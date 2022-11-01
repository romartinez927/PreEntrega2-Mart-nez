const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const carritoContainer = document.getElementById("carritoContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")

//Array de Objetos
let productosRopa = [{id: 1, nombre: "Remera V", tipo: "remera", precio: 1200, stock: 300, img:"./../img/Sintítulo2.png", cantidad: 1},
                    {id: 2, nombre: "Remera clásica de Modal", tipo: "remera", precio: 1200, stock: 350, img:"./../img/Sintítulo.png", cantidad: 1},
                    {id: 3, nombre: "Short Negro", tipo: "short", precio: 2100, stock: 150, img: "./../img/Sintítulo3.png", cantidad: 1},
                    {id: 4, nombre: "Short Calvin", tipo: "short", precio: 2300, stock: 150, img: "./../img/1636493340_df357a8dd8a8d84a31740985f0c60eb6.140307.jpeg", cantidad: 1},
                    {id: 5, nombre: "Short Flecos", tipo: "short", precio: 2500, stock: 100, img: "./../img/1664813536_85b38ebcb18d82ff5024533f1b4b6778.140307.jpeg", cantidad: 1},
                    {id: 6, nombre: "Campera Rebel", tipo: "campera", precio: 2500, stock: 200, img: "./../img/1661546792_b0ccd5911ea5c8e7758bbe80fd63cbfc.140307.jpeg", cantidad: 1},            
                    {id: 7, nombre: "Top Roger Militar", tipo: "top", precio: 1200, stock: 100, img: "./../img/1664818248_e18744f3b64d900f33feee8061177287.140307.jpeg", cantidad: 1},
                    {id: 8, nombre: "Remera básica", tipo: "remera", precio: 1500, stock: 200, img: "./../img/1589224046_b3f01ead4d639b4a063d39b11e3ba314.140307.jpeg", cantidad: 1},
                    {id: 9, nombre: "Top Morgan", tipo: "top", precio: 1300, stock: 200, img: "./../img/1573158303_5b0ab675382bf907b827aad6f74e3024.140307.jpeg", cantidad: 1},   
                    {id: 10, nombre: "Jogging frizado", tipo: "pantalón", precio: 2200, stock: 100, img: "./../img/01b28c191134c235bc5aedf88ccb8de51982492153588a1a3321ba525b6c1c4a95838.jpeg", cantidad: 1},
                    {id: 11, nombre: "Biker de algodón con lycra", tipo: "pantalón", precio: 1500, stock: 200, img: "./../img/080ba20369f48bf7fd8a368f506a44caa7e6e31829f9317d57953dc5fc33073f95838.jpeg", cantidad: 1},
                    {id: 12, nombre: "Jogging algodón rústico", tipo: "pantalón", precio: 2300, stock: 200, img: "./../img/fcd08eee38bf22369b022f6117e9c8309e0636e87d5395afb34866b27089080695838.jpeg", cantidad: 1},
         
                ]

let carrito = []

//Cards de productos
productosRopa.forEach((producto) => {
    let content = document.createElement("div")
    content.className = "card"
    content.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p class="price">$ ${producto.precio}</p>
    `

    shopContent.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "Comprar"
    comprar.className = "comprar"

    content.append(comprar)

// Agregar productos al carrito
    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id)

        if (repeat) {
            carrito.map((prod) => {
                if(prod.id === producto.id) {
                    prod.cantidad++
                }
            })
        } else {
            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            })
        }
        console.log(carrito)
        carritoCounter()
    })
})

const pintarCarrito = () => {
    carritoContainer.innerHTML = ""
    carritoContainer.style.display = "flex"
    const carritoHeader = document.createElement("div")
    carritoHeader.className = "carrito-header"
    carritoHeader.innerHTML = `
        <h1 class="carrito-header-title">Carrito.</h1>
    `
    carritoContainer.append(carritoHeader)

    const carritoButton = document.createElement("i")
    carritoButton.className = "carrito-header-button bi bi-x-circle"

    carritoButton.addEventListener("click", () => {
        carritoContainer.style.display = "none"
    }
    )

    carritoHeader.append(carritoButton)

    carrito.forEach ((producto) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "carrito-content"
    carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Total: ${producto.cantidad * producto.precio}</p>
    `

    carritoContainer.append(carritoContent)

// Eliminar productos del carrito
    let eliminar = document.createElement("span")
    eliminar.innerText = "(x)"
    eliminar.className = "delete-product"
    carritoContent.append(eliminar)

    eliminar.addEventListener("click", eliminarProducto)

    })

// Cálculo de precio total
    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML= `Total a pagar: $ ${total}`
    carritoContainer.append(totalCompra)
}

verCarrito.addEventListener("click", pintarCarrito)

// Eliminar productos
const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id)
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })
    carritoCounter()
    pintarCarrito()
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"
    cantidadCarrito.innerText = carrito.length
}

