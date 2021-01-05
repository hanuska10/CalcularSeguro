function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Calcular
Seguro.prototype.cotizarSeguro = function() {
    /*
    1 = americano 1.15
    2 = asiático 1.05
    3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año restaremos un 3% del valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /*
        Seguro básico * 30% más
        Seguro completo * 50% más
    */
    if (this.tipo == 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}

//Todo lo que se muestra
function Interfaz() {}


//Muestra mensaje de error
Interfaz.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('mensaje', 'error')
    } else {
        div.classList.add('mensaje', 'correcto')
    }
    div.classList.add('mt-10');
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        document.querySelector('.mensaje').remove();
    }, 2000);
}

//Muestra el resultado
Interfaz.prototype.mostrarResult = (seguro, total) => {
    const resultado = document.querySelector('#resultado');
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiático';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }

    //Muestra la información
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class="header">Precio </p>
    <p class="font-bold">Marca: <span class="font-normal">${seguro.marca} </span></p>
    <p class="font-bold">Año: <span class="font-normal">${seguro.year} </span></p>
    <p class="font-bold">Tipo: <span class="font-normal">${seguro.tipo} </span></p>
    <p class="font-bold"> Total: <span class="font-normal"> ${total} € </span> </p>
    `;


    //Mostar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; //Se borrar el spinner
        resultado.appendChild(div);
    }, 2000);
}

//Llena las opciones de los años
Interfaz.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectYear.appendChild(option);
    }
}


//Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
        interfaz.llenarOpciones();
    })
    // eventList()

//DOM Operaciones
const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', e => {
    e.preventDefault();

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer año seleccionado
    const year = document.querySelector('#year').value;

    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name=tipo]:checked').value;

    //Comprobamos que los campos no estén vacíos    
    if (marca == '' || year == '' || tipo == '') {
        interfaz.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } else {
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        //instanciar el seguro y mostrar interfaz
        const seguro = new Seguro(marca, year, tipo);

        //Cotizar seguro
        const cantidad = seguro.cotizarSeguro();

        //Mostrar el resultado
        interfaz.mostrarResult(seguro, cantidad);
        interfaz.mostrarMensaje('Calculando...', 'exito')
    }
})