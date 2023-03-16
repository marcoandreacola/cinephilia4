const urlParams = new URLSearchParams(window.location.search);
const titolo = urlParams.get('titolo');

fetch('APIcineCulture.json')
  .then((response) => response.json())
  .then((data) => {
    const articolo = data.find((a) => a.Title === titolo);
    fetch(`APIcineCulture.json?category=${articolo.category}`)
      .then((response) => response.json())
      .then((correlati) => {
        const correlatiContainer = document.getElementById('articoli-correlati');
        const correlatiToShow = shuffle(correlati).slice(0, 2); // Shuffle dei correlati e mostra solo i primi 3

        // Crea un contenitore per le colonne
        const columnContainer = document.createElement('div');
        columnContainer.classList.add('row');
        correlatiContainer.appendChild(columnContainer);

        // Crea una colonna per ogni card
        correlatiToShow.forEach((c) => {
          const columnElement = document.createElement('div');
          columnElement.classList.add('col-10');
          columnElement.classList.add('col-md-6');
          columnElement.classList.add('col-lg-6');
          columnElement.classList.add('mx-auto');
          columnElement.classList.add('my-3');




          const correlatoElement = document.createElement('div');
          correlatoElement.innerHTML = `
          <div class="fontarticoli cardarticolocineculturecorrelati w-100 position-relative" style="">
            <img src="${c.poster}" class="imgarticolocineculture" alt="...">
            <div class="card-body">
              <a href="#" onclick="mostraArticolo('${c.Title}')" class="text-decoration-none">
                <h4 class="fonttitolo py-3 text-center titolocardcineculture text-uppercase">${c.Title}</h4>
              </a>
              <a href="#" class="text-decoration-none">
                <p class="card-text py-0 mx-1 text-black ">${c.preview}</p>
                <div class="text-center contenitoretastorecensionecineculture">
                  <button class="btn btn-black rounded-0 tastorecensionecineculture">Leggi la recensione</button>
                </div>
              </a>
            </div>
            </div>
          `;

          columnElement.appendChild(correlatoElement);
          columnContainer.appendChild(columnElement);

          // Aggiungi l'event listener per il click
          const linkElement = correlatoElement.querySelector('.tastorecensionecineculture');
          correlatoElement.addEventListener('click', (event) => {
            event.preventDefault(); // previene il comportamento predefinito del link (ovvero la navigazione alla nuova pagina)
            window.location.href = `articolo.html?titolo=${c.Title}`; // reindirizza alla pagina dell'articolo correlato
          });
        });
      })
  .catch((error) => console.error(error));

  

//crea articolo singolo cliccato
const container = document.getElementById('articolo');
const colonnaarticolosingolo = document.querySelector('.coloarticolosingolo')

const titleElement = document.createElement('h2');
titleElement.textContent = articolo.Title;
colonnaarticolosingolo.appendChild(titleElement);
titleElement.classList.add('fontitolo');
titleElement.classList.add('text-uppercase');
titleElement.classList.add('text-center');
titleElement.classList.add('my-4');

const posterElement = document.createElement('img');
posterElement.src = articolo.poster;
colonnaarticolosingolo.appendChild(posterElement);
posterElement.classList.add('imgarticolosingolocineculture')

posterElement.classList.add('mb-3')

const textElement = document.createElement('div');
textElement.innerHTML = articolo.text;
colonnaarticolosingolo.appendChild(textElement);
textElement.classList.add('fontarticoli');

textElement.classList.add('mb-5');
})
.catch((error) => console.error(error));

function shuffle(array) { // Funzione per mischiare l'array in modo casuale
let currentIndex = array.length, randomIndex;

while (currentIndex != 0) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex--;
[array[currentIndex], array[randomIndex]] = [
  array[randomIndex], array[currentIndex]];
}

return array;
}
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
  const paragrafoalertregistrazione = document.querySelector('.alerterroreregistrazione')

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











































// CODICE ORIGINARIO CARD DI BOOTSTRAP FUNZIONANTE
// const urlParams = new URLSearchParams(window.location.search);
// const titolo = urlParams.get('titolo');

// fetch('APIcineCulture.json')
// .then((response) => response.json())
// .then((data) => {
// const articolo = data.find((a) => a.Title === titolo);
// fetch(`APIcineCulture.json?category=${articolo.category}`)
//   .then((response) => response.json())
//   .then((correlati) => {
//     const correlatiContainer = document.getElementById('articoli-correlati');
//     const correlatiToShow = shuffle(correlati).slice(0, 4); // Shuffle dei correlati e mostra solo i primi 4
//     correlatiToShow.forEach((c) => {
//       const correlatoElement = document.createElement('div');
//       correlatoElement.classList.add('card');

//       const cardBodyElement = document.createElement('div');
//       cardBodyElement.classList.add('card-body');

//       const cardTitleElement = document.createElement('h5');
//       cardTitleElement.classList.add('card-title');
//       cardTitleElement.textContent = c.Title;
//       cardBodyElement.appendChild(cardTitleElement);

//       const cardTextElement = document.createElement('p');
//       cardTextElement.classList.add('card-text');
//       cardTextElement.textContent = c.preview;
//       cardBodyElement.appendChild(cardTextElement);

//       const cardLinkElement = document.createElement('a');
//       cardLinkElement.href = `pagina-articolo.html?titolo=${c.Title}`;
//       cardLinkElement.classList.add('btn', 'btn-primary');
//       cardLinkElement.textContent = 'Leggi di più';
//       cardLinkElement.id = `correlato-${correlatiToShow.indexOf(c)}`;
//       cardBodyElement.appendChild(cardLinkElement);

//       correlatoElement.appendChild(cardBodyElement);
//       correlatiContainer.appendChild(correlatoElement);

//       // Aggiungi l'event listener per il click
//       const linkId = `correlato-${correlatiToShow.indexOf(c)}`;
//       const linkElement = document.getElementById(linkId);
//       linkElement.addEventListener('click', (event) => {
//         event.preventDefault(); // previene il comportamento predefinito del link (ovvero la navigazione alla nuova pagina)
//         window.location.href = `articolo.html?titolo=${c.Title}`; // reindirizza alla pagina dell'articolo correlato
//       });
//     });
//   })
//   .catch((error) => console.error(error));

// //crea articolo singolo cliccato
// const container = document.getElementById('articolo');
// const colonnaarticolosingolo = document.querySelector('.coloarticolosingolo')

// const titleElement = document.createElement('h2');
// titleElement.textContent = articolo.Title;
// colonnaarticolosingolo.appendChild(titleElement);
// titleElement.classList.add('text-center');
// titleElement.classList.add('fontitolo');
// titleElement.classList.add('text-uppercase');
// titleElement.classList.add('my-4');

// const posterElement = document.createElement('img');
// posterElement.src = articolo.poster;
// colonnaarticolosingolo.appendChild(posterElement);
// posterElement.classList.add('imgarticolosingolocineculture')
// posterElement.classList.add('mb-3')

// const textElement = document.createElement('div');
// textElement.innerHTML = articolo.text;
// colonnaarticolosingolo.appendChild(textElement);
// textElement.classList.add('fontarticoli');
// textElement.classList.add('text-center');
// textElement.classList.add('mb-5');
// })
// .catch((error) => console.error(error));

// function shuffle(array) { // Funzione per mischiare l'array in modo casuale
// let currentIndex = array.length, randomIndex;

// while (currentIndex != 0) {
// randomIndex = Math.floor(Math.random() * currentIndex);
// currentIndex--;
// [array[currentIndex], array[randomIndex]] = [
//   array[randomIndex], array[currentIndex]];
// }

// return array;
// }
// //codice per form registrati e accedi
// const userIcon = document.getElementById('user-icon');
// const registrationForm = document.getElementById('registration-form');
// const closeIcon = document.getElementById('close-icon');
// const loginLink = document.getElementById('login-link');
// const loginForm = document.getElementById('login-form');
// const closeIcon2 = document.getElementById('close-icon-2');
// const registerLink = document.getElementById('register-link');

// // mostra il form di registrazione quando l'utente clicca sull'icona utente
// userIcon.addEventListener('click', function() {
//   registrationForm.style.display = 'flex';
// });

// // nasconde il form di registrazione quando l'utente clicca sull'icona di chiusura
// closeIcon.addEventListener('click', function() {
//   registrationForm.style.display = 'none';
// });

// // mostra il form di login quando l'utente clicca sul link "Accedi"
// loginLink.addEventListener('click', function(event) {
//   event.preventDefault();
//   registrationForm.style.display = 'none';
//   loginForm.style.display = 'flex';
// });

// registerLink.addEventListener('click', function(event) {
//   event.preventDefault();
//   loginForm.style.display = 'none';
//   registrationForm.style.display = 'flex';
// });

// // nasconde il form di login quando l'utente clicca sull'icona di chiusura
// closeIcon2.addEventListener('click', function() {
//   loginForm.style.display = 'none';
// });

// function validateForm() {
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;
//   const passwordconfirm = document.getElementById('passwordconfirm').value;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/; // password deve avere almeno 6 caratteri, un numero e una maiuscola
//   const paragrafoalertregistrazione = document.querySelector('.alerterroreregistrazione')

//   if (username.length < 6) {
//     paragrafoalertregistrazione.innerHTML= `L'username deve avere almeno 6 caratteri`;
//     return false;
//   }

//   if (!passwordRegex.test(password)) {
//     paragrafoalertregistrazione.innerHTML= `La password deve contenere almeno 6 caratteri, un numero e una maiuscola`;
//     return false;
//   }else{
//     if(password !== passwordconfirm){
//       paragrafoalertregistrazione.innerHTML= `Le due password devono essere uguali`;
//       return false;
//     }
//   }

//   return true;
// }

// // Seleziona l'input della password e la scritta mostra password
// const passwordInput = document.getElementById("password");
// const passwordInput2 = document.getElementById("passwordconfirm");
// const passwordToggle = document.querySelector(".password-toggle-icon");

// // Aggiungi un listener per il click sull'icona dell'occhio
// passwordToggle.addEventListener("click", function() {
// // Ottieni il tipo di input corrente (password o text)
// const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
// const type2 = passwordInput2.getAttribute("type") === "password" ? "text" : "password";
// // Cambia il tipo di input
// passwordInput.setAttribute("type", type);
// passwordInput2.setAttribute("type", type);
// // Cambia l'icona dell'occhio
// this.classList.toggle.innerHTML = `Mostra password`;
// this.classList.toggle.innerHTML = `Nascondi password`;

// // Cambia il testo del div a seconda dello stato del pulsante
// passwordToggle.textContent = type === 'password' ? 'Mostra password' : 'Nascondi password';
// });

// // Seleziona l'input della password e la scritta mostra password
// const passwordlogin = document.getElementById("password-login");
// const passwordTogglelogin = document.querySelector(".mostrapasswordlogin");

// // Aggiungi un listener per il click sull'icona dell'occhio
// passwordTogglelogin.addEventListener("click", function() {
// // Ottieni il tipo di input corrente (password o text)
// const type = passwordlogin.getAttribute("type") === "password" ? "text" : "password";
// // Cambia il tipo di input
// passwordlogin.setAttribute("type", type);
// // Cambia l'icona dell'occhio
// passwordTogglelogin.textContent = type === 'password' ? 'Mostra password' : 'Nascondi password';
// });