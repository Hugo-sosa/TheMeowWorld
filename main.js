if ('serviceWorker' in navigator) {
  console.log('si tienes sw');
  navigator.serviceWorker.register('./sw.js')
  .then(res=>console.log('sw cargado'))
  .catch(err=>console.log('sw no cargado'));
} else {
  console.log('no tienes sw');
}
