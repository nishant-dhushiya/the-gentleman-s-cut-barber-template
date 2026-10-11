/* The Gentleman's Cut template scripts */
(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  if(btn){btn.addEventListener('click',function(){nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open'));});}
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}):null;
  document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in');});
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit',function(ev){ev.preventDefault();var m=f.querySelector('.form-msg');if(m){m.style.display='block';m.textContent='Thanks! This GitHub copy does not send emails. Get the free full package (with the contact.php mail handler) from webtemplatehub.online.';}f.reset();});
  });
  var y=document.getElementById('year');if(y){y.textContent=new Date().getFullYear();}
  // Lead popup: data-type = offer | enquiry | exit ; shows once per session
  var pop=document.getElementById('lead-popup');
  if(pop){
    var type=pop.getAttribute('data-type'),delay=+pop.getAttribute('data-delay')||8000,KEY='lp_seen_'+location.pathname.split('/').slice(0,-1).join('/');
    var seen=function(){try{return sessionStorage.getItem(KEY)==='1';}catch(e){return false;}};
    var mark=function(){try{sessionStorage.setItem(KEY,'1');}catch(e){}};
    var last=null;
    var open=function(force){if(pop.classList.contains('open')||(!force&&seen()))return;last=document.activeElement;pop.classList.add('open');pop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';mark();var f=pop.querySelector('input:not(.hp)');if(f)setTimeout(function(){f.focus();},60);};
    var close=function(){pop.classList.remove('open');pop.setAttribute('aria-hidden','true');document.body.style.overflow='';if(last&&last.focus)last.focus();};
    pop.addEventListener('click',function(e){if(e.target===pop||e.target.closest('.popup-close'))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    document.querySelectorAll('[data-popup]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open(true);});});
    if(type==='exit'){
      document.addEventListener('mouseout',function(e){if(!e.relatedTarget&&e.clientY<8)open();});
      window.addEventListener('scroll',function(){var h=document.documentElement;if(window.innerWidth<760&&(h.scrollTop+window.innerHeight)/h.scrollHeight>0.65)open();},{passive:true});
    }else{setTimeout(open,delay);}
  }
})();
