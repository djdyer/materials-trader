const plastic = document.querySelector('#search-plastic')
const glass = document.querySelector('#search-glass')
const aluminum = document.querySelector('#search-aluminum')
const textiles = document.querySelector('#search-textiles')
const cardboard = document.querySelector('#search-cardboard')
const paper = document.querySelector('#search-paper')
const electronics = document.querySelector('#search-electronics')
const batteries = document.querySelector('#search-batteries')
const appliances = document.querySelector('#search-appliances')
const steel = document.querySelector('#search-steel')
const concrete = document.querySelector('#search-concrete')
const oil = document.querySelector('#search-oil')

const searchPlastic = async (event) => {
  const response = await fetch('/api/users', {
    method: 'GET',
    body: JSON.stringify({ listings }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/home')
  } else {
    alert('Failed to search material.')
  }
}

document
  .querySelector('#search-plastic')
  .addEventListener('click', searchPlastic)

document.querySelector('#search-glass')
.addEventListener('click', searchGlass)
document
  .querySelector('#search-aluminum')
  .addEventListener('click', searchAluminum)
document
  .querySelector('#search-textiles')
  .addEventListener('click', searchTextiles)
document
  .querySelector('#search-cardboard')
  .addEventListener('click', searchCardboard)

document.querySelector('#search-paper')
.addEventListener('click', searchPaper)
document
  .querySelector('#search-electronics')
  .addEventListener('click', searchElectronics)
document
  .querySelector('#search-batteries')
  .addEventListener('click', searchBatteries)
document
  .querySelector('#search-appliances')
  .addEventListener('click', searchAppliances)

document.querySelector('#search-steel')
.addEventListener('click', searchSteel)
document
  .querySelector('#search-concrete')
  .addEventListener('click', searchConcrete)
document.querySelector('#search-oil')
.addEventListener('click', searchOil)
