const counterElement = document.getElementById('Counter');
let counter = 5;
function counterFunction() {
    counterElement.textContent = counter;

    if (counter === 0) return;

    counter--;

    setTimeout(counterFunction, 1000);
}
counterFunction();