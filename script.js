const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('show'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-count]').forEach(el=>{
  const target = Number(el.dataset.count);
  if(!target) return;
  let done=false;
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && !done){
      done=true; let n=0; const step=Math.max(1,Math.ceil(target/30));
      const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=String(n).padStart(2,'0')+'+';if(n>=target)clearInterval(timer)},30);
      io.disconnect();
    }
  });
  io.observe(el);
});

const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav nav');
menu?.addEventListener('click',()=>nav.classList.toggle('mobile-open'));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id && id.length>1){ const el=document.querySelector(id); if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});nav?.classList.remove('mobile-open');} }
  });
});