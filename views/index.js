const search = document.getElementById('search')
const matchList = document.getElementById('match-list')
const busca = async searchText => {
    const res = await fetch(`http://localhost:3000/api/search/auto?keyWord=${searchText}`)
    const result = await res.json();

    var products = result.filter(result => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return result.nomeProduto.match(regex)
    })


    if (searchText.length === 0) {

        products = [];
        matchList.innerHTML = ''
    }

    outputHtml(products)
};

const outputHtml = products => {
    if (products.length > 0) {
        const html = products.map(products => `
                <div class="card card-body mb-1">
                    <h4 class="text-primary">${products.nomeProduto}</h4>
                </div>
            
            `).join('')

        matchList.innerHTML = html

    }



}
search.addEventListener('input', () => busca(search.value))