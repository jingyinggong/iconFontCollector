(function(){
  var timeout = null;
  function init() {
    var bar = document.querySelector(".block-bar-right .block-radius-btn-group");
    if(!bar) {
      tryToDetect();
      return;
    } else {
      clearTimeout(timeout);
    }

    var btn = document.createElement('span');
    btn.className = 'radius-btn radius-btn-like';
    btn.title = "全选";
    btn.style.backgroundColor="mediumpurple";
    btn.innerHTML = `<svg class="icon" style="width: 0.6em; height: 0.6em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35710"><path d="M102.4 302.08c5.12 5.12 15.36 10.24 25.6 10.24s15.36-5.12 25.6-10.24l174.08-174.08c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-20.48-5.12-40.96-5.12-51.2 10.24l-148.48 153.6-71.68-76.8C51.2 158.72 40.96 158.72 35.84 158.72c-10.24 0-15.36 5.12-25.6 10.24-5.12 5.12-10.24 10.24-10.24 20.48s5.12 15.36 10.24 25.6L102.4 302.08zM276.48 409.6l-148.48 153.6-71.68-71.68C51.2 486.4 40.96 481.28 35.84 481.28c-10.24 0-15.36 5.12-25.6 10.24-5.12 10.24-10.24 15.36-10.24 25.6s5.12 15.36 10.24 25.6L102.4 629.76c5.12 5.12 15.36 10.24 25.6 10.24s15.36-5.12 25.6-10.24L322.56 460.8c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-10.24-10.24-30.72-10.24-46.08 0z m0 327.68l-148.48 153.6L56.32 819.2c-5.12-5.12-15.36-10.24-25.6-10.24s-15.36 5.12-25.6 10.24c0 5.12-5.12 15.36-5.12 25.6s5.12 15.36 10.24 25.6L102.4 957.44c5.12 5.12 15.36 10.24 25.6 10.24h5.12c10.24 0 15.36-5.12 25.6-10.24l174.08-174.08c5.12-5.12 10.24-15.36 10.24-25.6s-5.12-15.36-10.24-25.6c-25.6-5.12-40.96-5.12-56.32 5.12zM1024 153.6c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-61.44-25.6-61.44-56.32 0-30.72 25.6-56.32 56.32-56.32h455.68c35.84-5.12 66.56 20.48 66.56 56.32z m0 358.4c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-56.32-25.6-56.32-56.32s25.6-56.32 56.32-56.32h455.68c35.84 0 61.44 25.6 61.44 56.32z m-5.12 358.4c0 30.72-25.6 56.32-56.32 56.32h-460.8c-30.72 0-56.32-25.6-56.32-56.32 0-30.72 25.6-56.32 56.32-56.32h455.68c35.84 0 61.44 25.6 61.44 56.32z m0 0" fill="#ffffff" p-id="LoganGongPlugin"></path></svg>`;
    btn.addEventListener('click', function(){
      document.querySelectorAll('.icon-gouwuche1').forEach(item=>item.click());
    }, false);

    bar.appendChild(btn);
  }
  function tryToDetect() {
    timeout = setTimeout(init, 1000);
  }

  tryToDetect();

})();
