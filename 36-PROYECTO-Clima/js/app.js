const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')


window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault();

    //validar
    const ciudad  = document.querySelector('#ciudad').value
    const pais  = document.querySelector('#pais').value

    if( ciudad === '' || pais === '' ){
        mostrarError('Ambos campos son obligatorios')
        return;
    }


    //consultar a la api
    consultarApi(ciudad,pais)

}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')

   if(!alerta){
     //crear una alerta
     const alerta = document.createElement('div')

     alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');
     alerta.innerHTML = `
     <strong class="font-bold">Error!</strong>
     <span class="block">${mensaje}</span>
     `
     container.appendChild(alerta);

     setTimeout(() =>{
        alerta.remove();
      },5000);
   }
  
}


function consultarApi(ciudad,pais){
    const appId = 'c0790e3d3ed8af7f6a2ec0a99faf1c54'
    
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner()
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        limpiarHTML()
        if(datos.cod === "404"){
            mostrarError('Ciudad No Encontrada')
            return;
        }
    
    
    
        //imprime la respuesta en el html
        mostrarClima(datos)

    })

    
}


function mostrarClima(datos){
    

    const {name,main :{temp , temp_max, temp_min}}=datos
    
    const centigrados = kelvinAcentrigrados(temp)
    const max = kelvinAcentrigrados(temp_max)
    const min = kelvinAcentrigrados(temp_min)

    let emojiClima;
    if(centigrados <= 15){
        emojiClima = '🥶'
    }else if(centigrados >= 27){
        emojiClima = '🔥'
    }else{
        emojiClima= '😶👌'
    }  

    const nombreciudad = document.createElement('p')
    nombreciudad.textContent = `El clima en la ciudad de ${name} es :`
    nombreciudad.classList.add('font-bold','text-2xl')
  
    const actual  = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451 ${emojiClima} `
    actual.classList.add('font-bold','text-6xl')

    const tempMax = document.createElement('p')
    tempMax.innerHTML=`Max : ${max} &#8451;`
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p')
    tempMin.innerHTML=`Min : ${min} &#8451`
    tempMax.classList.add('text-xl')


    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center','text-white')

    resultadoDiv.appendChild(nombreciudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)

    resultado.appendChild(resultadoDiv)
}

const kelvinAcentrigrados = grados => parseInt(grados - 273.15)
     

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner(){
    //limpia el html
    limpiarHTML()

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner)
}
