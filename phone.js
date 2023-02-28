const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, dataLimit)
}

const displayPhone = (phone, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-all')
    if (dataLimit && phone.length > 10) {
        phone = phone.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    const noPhone = document.getElementById('no-found-message')
    if (phone.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    phone.forEach(data => {
        console.log()
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-text">Brand: ${data.brand}</h4>
          <h5 class="card-title">Phone Name: ${data.phone_name}</h5>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut non quia ex eos quis mollitia.</p>
        </div>
        <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false)
}

const processSearch = dataLimit => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
    toggleSpinner(true)
}

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10)
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('search-show-all').addEventListener('click', function () {
    processSearch()
})

const loadPhoneDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data)
    displayDetails(data.data)
}

const displayDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.slug;
    const modalBody = document.getElementById('phone-details')
    modalBody.innerHTML = `
    <p>chipSet: ${phone.mainFeatures.chipSet}</p>
    <p>chipSet: ${phone.mainFeatures.displaySize}</p>
    <p>chipSet: ${phone.mainFeatures.memory}</p>
    `
}
