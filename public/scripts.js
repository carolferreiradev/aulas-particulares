const links = document.querySelectorAll('header .links-header a')
const dados = location.pathname

for (link of links) {
    if (dados.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }
}

/**********************************************************************/
function paginateModel(totalPages, selectedPage) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstPage = currentPage <= 2 
        const lastPage = currentPage == totalPages || totalPages - currentPage == 1
        
        let pagesAfterSelectedPage,
              pagesBeforeSelectedPage 

        if(totalPages > 7){
             pagesAfterSelectedPage = currentPage <= selectedPage + 1
             pagesBeforeSelectedPage = currentPage >= selectedPage - 1
        }else{
             pagesAfterSelectedPage = currentPage <= selectedPage + 2
             pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        }

        if(firstPage || lastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage){
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...')
            }
            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)

            oldPage = currentPage
        }
    }
    return pages
}

function createPaginationOnScreen(pagination){
    const page = +pagination.dataset.page
    const total  = +pagination.dataset.total
    const filter = pagination.dataset.filter

    const pages = paginateModel(total, page)

    let elements = ""

    for(let page of pages){
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            }else{
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML  = elements
}

const pagination = document.querySelector('.pagination')

if(pagination){
    createPaginationOnScreen(pagination)
}


// MENSAGENS DE AVISO AO USUÁRIO DE CAMPO SEM PREENCHIMENTO
function ValidadeValues(event){
    const fields =  document.querySelectorAll('.item input', '.item select', '.item')

    for(field of fields){
       if(field.value == ""){
          const message = document.createElement('div')
          message.classList.add('messages')
          message.classList.add('error')
          message.style.position ='fixed'
          message.innerHTML = "Todos os campos são de preenchimento obrigatório!"
          document.querySelector('body').append(message)
          event.preventDefault()
       }
    }
}