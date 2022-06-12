const btn = document.querySelector('#commit')
const city_name = document.querySelector('#city')
const result_div = document.querySelector("#result")


const mainfunc = () => {
    getLocation()
    city_name.value = ''
}

const generateGif = async (data) => {
    var target = data['weather'][0]['main']
    const respond = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=kiZo3MJbVbAfYXgd6U9DX31K7NQa8xqP&q=${target}&limit=25&offset=0&rating=g&lang=en`)
    respond.json().then(result=>{
        const url = result.data[Math.floor(Math.random() * result.data.length)].images.original.url
        console.log(url)
        const img = document.createElement('img')
        img.src = url
        result_div.appendChild(img)
    })

}

async function getLocation() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name.value}&appid=2643ba1a20f72ed9eeef733c34424426&units=metric`)
    response.json().then( (result) => {
        const data = result
        var heading = document.createElement('h3')
        var description  = document.createElement('p')
        description.innerText = `Weather in ${data['name']} is ${data['main']['temp']} celcius, ${data['weather'][0]["description"]}`
        heading.innerText = data['name']
        
        generateGif(data)

        result_div.appendChild(heading)
        result_div.appendChild(description)
    } )
}

btn.addEventListener('click',mainfunc)
city_name.addEventListener('keypress',(key)=>{
    if(key.key == 'Enter'){
        mainfunc()
    }
})
