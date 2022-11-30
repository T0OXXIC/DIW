document.addEventListener("keypress", function (e) {
  if (e.key === 'Enter') {
    var btn = document.querySelector('button');
    btn.click();
  }
});
var btn = document.querySelector('button');

btn.onclick = function() {
  
  if (document.querySelector('#list-nav').classList.contains('active')) {
    document.querySelector('#list-nav').classList.remove('active')
    document.querySelector('#list-nav').classList.add('inactive')
  } else {
    document.querySelector('#list-nav').classList.remove('inactive')
    document.querySelector('#list-nav').classList.add('active')
  }
}

