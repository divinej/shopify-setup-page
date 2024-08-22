
// Progress Bar
const range = document.querySelector('#progress');
const rangeValue = document.querySelector('#rangeValue');
const setUpContainer = document.querySelectorAll(".guide");

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

let currentValue = Number(range.value);
rangeValue.innerText = range.value;

setUpContainer.forEach(element => {
    element.addEventListener('click', completeSetup);
})


function completeSetup(event) {
    if (event.target.dataset.name !== "setup") return;
    const animationContainer = event.target.closest(".guide").querySelector(".svg-container");

    

    if (animationContainer.classList.contains === "animation"){
        return
    } else {
        event.target.setAttribute("disabled", "");
        animationContainer.classList.add('animation');
        currentValue += 1;

        let customizeAlert = event.target.closest(".guide-details").firstElementChild;
        let setup = event.target.dataset.setup;
        let setupParent = event.target.closest(".guide").firstElementChild;
        
        setTimeout(()=> {
            updateProgress();
            setupParent.focus();
            
            switch (Number(setup)) {
                case 1:
                    customizeAlert.innerText = "Theme customization completed";
                    break;
                case 2: 
                    customizeAlert.innerText = "First product added";
                    break;
                case 3: 
                    customizeAlert.innerText = "Custom domain added";
                    break;
                case 4:
                    customizeAlert.innerText = "Stored name added";
                    break;
                case 5:
                    customizeAlert.innerText = "Payment provided added";
                    break;
            }
            if (currentValue === 5) {
                appendAlert('Nice, you completed your store setup!', 'success');
                let closeSetupAlert = document.querySelector(".icon1");
                closeSetupAlert.focus();
            }
        }, 2500);
    }
}

const updateProgress = () => {
    rangeValue.innerText = currentValue;
    let percent = ( currentValue / range.max ) * 100;
    range.style.setProperty("--progress", percent + "%")
}
updateProgress();

// Close Alert 
const closeAlert = document.querySelector('.alert-close');
const alert = document.querySelector('.alert');
const setupDropdown = document.querySelector(".setup-summary");
closeAlert.addEventListener('click', function(event) {
    event.preventDefault();
    alert.classList.add('visually-hidden');
})


// Move focus when alert is dismissed by a keyboard user
alertPlaceholder.addEventListener('close.bs.alert', function() {
    setupDropdown.focus();
})

// Notification
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <p class="fs-300 fw-600">Alert</p>`,
    '   <button tabindex="0" type="button" class="btn-close icon1" data-bs-dismiss="alert" aria-label="Close"></button>',
    '   <button tabindex="-1" type="button" class="icon2 btn-close" aria-hidden="true"></button>',
    `   <div class="gray-bg flex message">${message}</div>`,
    '</div>'
  ].join('')
  wrapper.classList.add('alert-wrapper');
  alertPlaceholder.append(wrapper);
}