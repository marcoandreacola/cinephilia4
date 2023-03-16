// Fetch API per i dati sui film
fetch("APIreview.json")
  .then((response) => response.json())
  .then((data) => {
    // creazione row e appesa al container
    let containerarticoli = document.querySelector('.containerarticoli');
    let row = document.createElement('div');
    row.classList.add('row');
    containerarticoli.appendChild(row)

    // Prendi solo i primi 4 elementi dell'array data
    let articoliPrincipali = data.slice(0, 8);

    articoliPrincipali.forEach(articolo => {
      let titolo = articolo.Title
      let poster = articolo.Poster
      let regista = articolo.Director
      let annoUscita = articolo.Year
      // creazione colonna per ogi articolo
    let card = document.createElement('div');
    card.classList.add('col');
    card.classList.add('d-flex');
    card.classList.add('justify-content-center');
    card.classList.add('col-md-3');
    
    card.classList.add('col-sm-6');
    card.classList.add('mx-auto');
    card.classList.add('my-2');
    row.appendChild(card)
    // card di ogni articolo:
    card.innerHTML= 
    `
    <div class="cardarticolo fontarticoli position-relative" style="width: 18rem;">
        <img src="${poster}" class="imgcardarticolo" alt="...">
        <div class="py-0">
        <a href="#" class="text-decoration-none py-0">
          <h4 class="card-title fonttitolo pt-2 text-center titolocard text-uppercase ">${titolo}</h4>
        </a>
        <a href="#" class="text-decoration-none py-0">
          <p class="card-text py-0 my-1 text-black ms-1">Regista: ${regista}</p>
          <p class="card-text py-0 mt-0 text-black ms-1">Anno uscita: ${annoUscita}</p>
          
        </a>   
        </div>
        <div class="text-center mb-0 pb-2 contenitorebuttoncardrecensioni w-100">
            <button class="btn btn-black rounded-0 text-center mx-auto tastocardrecensioni">Leggi la recensione</button>
          </div>
      </div>
    `
    

      card.addEventListener('click', () => {
        const queryParams = new URLSearchParams({
          titolo: titolo,
          poster: poster,
          regista: regista,
          annoUscita: annoUscita
        });
        window.location.href = `recensionearticolo.html?${queryParams}`;
      })
      
   });
  });
  
  //codice per form registrati e accedi
  const userIcon = document.getElementById('user-icon');
  const registrationForm = document.getElementById('registration-form');
  const closeIcon = document.getElementById('close-icon');
  const loginLink = document.getElementById('login-link');
  const loginForm = document.getElementById('login-form');
  const closeIcon2 = document.getElementById('close-icon-2');
  const registerLink = document.getElementById('register-link');
  
  // mostra il form di registrazione quando l'utente clicca sull'icona utente
  userIcon.addEventListener('click', function() {
    registrationForm.style.display = 'flex';
  });
  
  // nasconde il form di registrazione quando l'utente clicca sull'icona di chiusura
  closeIcon.addEventListener('click', function() {
    registrationForm.style.display = 'none';
  });
  
  // mostra il form di login quando l'utente clicca sul link "Accedi"
  loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    registrationForm.style.display = 'none';
    loginForm.style.display = 'flex';
  });

  registerLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'none';
    registrationForm.style.display = 'flex';
  });
  
  // nasconde il form di login quando l'utente clicca sull'icona di chiusura
  closeIcon2.addEventListener('click', function() {
    loginForm.style.display = 'none';
  });

  function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordconfirm = document.getElementById('passwordconfirm').value;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/; // password deve avere almeno 6 caratteri, un numero e una maiuscola
    const paragrafoalertregistrazione = document.querySelector('.alerterroreregistrazione');

    if (username.length < 6) {
      paragrafoalertregistrazione.innerHTML= `L'username deve avere almeno 6 caratteri`;
      return false;
    }
  
    if (!passwordRegex.test(password)) {
      paragrafoalertregistrazione.innerHTML= `La password deve contenere almeno 6 caratteri, un numero e una maiuscola`;
      return false;
    }else{
      if(password !== passwordconfirm){
        paragrafoalertregistrazione.innerHTML= `Le due password devono essere uguali`;
        return false;
      }
    }
  
    return true;
  }

// Seleziona l'input della password e la scritta mostra password
const passwordInput = document.getElementById("password");
const passwordInput2 = document.getElementById("passwordconfirm");
const passwordToggle = document.querySelector(".password-toggle-icon");

// Aggiungi un listener per il click sull'icona dell'occhio
passwordToggle.addEventListener("click", function() {
  // Ottieni il tipo di input corrente (password o text)
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  const type2 = passwordInput2.getAttribute("type") === "password" ? "text" : "password";
  // Cambia il tipo di input
  passwordInput.setAttribute("type", type);
  passwordInput2.setAttribute("type", type);
  // Cambia l'icona dell'occhio
  this.classList.toggle.innerHTML = `Mostra password`;
  this.classList.toggle.innerHTML = `Nascondi password`;

  // Cambia il testo del div a seconda dello stato del pulsante
  passwordToggle.textContent = type === 'password' ? 'Mostra password' : 'Nascondi password';
});

// Seleziona l'input della password e la scritta mostra password
const passwordlogin = document.getElementById("password-login");
const passwordTogglelogin = document.querySelector(".mostrapasswordlogin");

// Aggiungi un listener per il click sull'icona dell'occhio
passwordTogglelogin.addEventListener("click", function() {
  // Ottieni il tipo di input corrente (password o text)
  const type = passwordlogin.getAttribute("type") === "password" ? "text" : "password";
  // Cambia il tipo di input
  passwordlogin.setAttribute("type", type);
  // Cambia l'icona dell'occhio
  passwordTogglelogin.textContent = type === 'password' ? 'Mostra password' : 'Nascondi password';
});

 


