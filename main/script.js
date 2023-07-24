function users(url) {
  fetch(url).then((res) => res.json()).then(res => {
    let appendElemsBox = document.querySelector('.append-elems-box')
    appendElemsBox.innerHTML = ''
    res.users.slice(0, 5).forEach(item => {
      let appendElems = document.createElement('div')
      appendElems.classList.add('append-elems')
      appendElems.innerHTML = `
            <hr class="main-hr">
            <p class="item-id">${item.id}</p>
            <div class="main-table-append">
              <div class="author">
                <img src="${item.image}" alt="">
                <div class="data">
                  <p class="fname main-text">${item.firstName} ${item.lastName}</p>
                  <p class="email small-text">${item.email}</p>
                </div>
              </div>
              <div class="function">
                <p class="manager main-text main-text-gray">${item.company.department}</p>
                <p class="organization small-text">${item.company.title}</p>
              </div>
              <div class="status">
                <p class="online main-text">ONLINE</p>
              </div>
              <div class="employed">
                <p class="emp-date main-text main-text-gray">${item.birthDate}</p>
              </div>
              <div class="show">
                <P class="show-user main-text main-text-gray">Show</P>
              </div>
            </div>
            `
      appendElemsBox.append(appendElems)
    });
    let show = document.querySelectorAll('.show-user')
    show.forEach(item => {
      item.addEventListener('click', (e) => {
        let some = e.target.parentElement.parentElement.parentElement.children[1].innerHTML
        fetch(`https://dummyjson.com/users/${some}`)
          .then(r => r.json())
          .then(r => openModal(r));
      })
    })
  })
}
users('https://dummyjson.com/users')




function openModal(userData) {
  let modal = document.querySelector('.modal');
  modal.innerHTML = `
    <div class="modal-content">
    <a href="#" class="close"><i class="fa-solid fa-circle-xmark"></i></a>
    <image src='${userData.image}' class='user_photo' />
    <p><strong>First Name:</strong> ${userData.firstName}</p>
    <p><strong>Last Name:</strong> ${userData.lastName}</p>
    <p><strong>Username:</strong> ${userData.username}</p>
    <p><strong>City:</strong> ${userData.address.city}</p>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Phone:</strong> ${userData.phone}</p>
    <p><strong>Age:</strong> ${userData.age}</p>
  </div>
	`;
  modal.style.filter = 'blur(0px)'
  let closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (event) => {
    modal.style.display = 'none';
  });
  modal.style.display = 'block';
}



function limitsSkip(skip) {
  fetch(`https://dummyjson.com/users?limit=5&${skip}=10&select=firstName,age`)
    .then(res => res.json())
    .then(res => {
      let pages = document.querySelector('.pages')
      for (const iterator of pages.children) {
        iterator.addEventListener('click', (e) => {
          let skip;
          console.log(e.target.innerText);
          if (e.target.innerText === 2) {
            skip = 5
          }
        })
      }
    })
}
limitsSkip(5)




let inpLable = document.querySelector('.inp-lable')
inpLable.addEventListener('input', (e) => {
  users(`https://dummyjson.com/users/search?q=${e.target.value}`);
  console.log(inpLable);
})