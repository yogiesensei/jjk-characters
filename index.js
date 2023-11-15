const container = document.getElementById('container')

// arrow function
const fetchCharacter = () => {
    // fetch data dengan .then
    fetch('https://api.jikan.moe/v4/random/characters')
        .then(data => data.json())
        .then(item => {
            const name = document.createElement('p')
            name.innerText = item.data.name
            container.appendChild(name)
            const image = document.createElement('img')
            image.setAttribute('src', item.data.images.webp.image_url)
            container.appendChild(image)
        })
}

// fetchCharacter()

const templateCharacter = (item) => {
    return `
    <div class='character'>
    <p>Name: ${item.name}</p>
    <img src=${item.image} alt=${item.name}></img>
    </div>
    `
}


const animeCharacters = () => {
    fetch('https://api.jikan.moe/v4/anime/51009/characters')
        .then(data => data.json())
        .then(item => {
            let characters = item.data
            const characterName = characters.map(item => ({
                name: item.character.name,
                image: item.character.images.webp.image_url
            }))
            const sortedCharacter = characterName.sort((asc, desc) => asc.name > desc.name ? 1 : -1)
            let content = ''
            sortedCharacter.map(character => content += templateCharacter(character))
            container.innerHTML = content
        })
}
animeCharacters()