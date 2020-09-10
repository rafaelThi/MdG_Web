const platforms = [
    "PlayStation 4",
    "PlayStation 3",
    "PlayStation 2",
    "Xbox One",
    "Xbox 360",
    "Nintendo Switch",
    "Nintendo 3DS",
]

const states = [
    "Novo",
    "Usado",
]

const generouss = [
"Ação",
"Aventura",
"Estratégia",
"RPG",
"Corrida",
"Esportes",
"Apenas On-line",
"FPS",
"Luta",
"Simulação",
]

function getstate(stateNumber) {
    const position = +stateNumber - 1
    return states[position]
}
function getplatform(platformNumber) {
    const position = +platformNumber - 1
    return platforms[position]
}
function getgenerous(generousNumber) {
    const position = +generousNumber - 1
    return generouss[position]
}

module.exports = {
    platforms,
    states,
    generouss,
    getstate,
    getplatform,
    getgenerous
}