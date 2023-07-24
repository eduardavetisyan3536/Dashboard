  let params = {
    username: 'kminchelle',
    password: '0lelplR'
  }
  console.log(JSON.stringify(params));

  function postLogin() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://dummyjson.com/auth/login')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(params))
  }

  function set() {
    let username1 = document.querySelector('.email')
    let password2 = document.querySelector('.password')
    let submit = document.querySelector('.submit')

    submit.addEventListener('click', () => {
      postLogin()
      let items = {
        username: `${username1.value}`,
        password: `${password2.value}`
      }
      localStorage.setItem('items', JSON.stringify(items))
      let getitem = localStorage.getItem('items')
      if (getitem == JSON.stringify(params)) {
        window.location.href = './main/main.html'
      }
    })

  }
  set()
  if(localStorage.getItem('items') == JSON.stringify(params)){
    window.location.href = './main/main.html'
    console.log(1231);
  }