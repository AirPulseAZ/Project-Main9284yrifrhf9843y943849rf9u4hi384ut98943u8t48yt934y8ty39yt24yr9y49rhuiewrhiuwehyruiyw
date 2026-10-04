'use strict';
const menu=document.querySelector('.menu-button'),links=document.getElementById('navlinks');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.classList.toggle('open',open)});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');links.classList.remove('open')}));
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>document.getElementById('service').value=a.dataset.service));
document.getElementById('year').textContent=new Date().getFullYear();
const emailDialog=document.getElementById('email-dialog');
document.getElementById('contact-form').addEventListener('submit',event=>{
 event.preventDefault();
 const f=new FormData(event.currentTarget),to='service@airpulseaz.com';
 const subject='AirPulse service request: '+f.get('service');
 const body=`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nCity: ${f.get('city')}\nService: ${f.get('service')}\n\n${f.get('message')}`;
 document.getElementById('email-app').href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 const gmail=new URL('https://mail.google.com/mail/');
 gmail.search=new URLSearchParams({view:'cm',fs:'1',to,su:subject,body}).toString();
 document.getElementById('email-gmail').href=gmail.href;
 document.getElementById('email-draft').value=`To: ${to}\nSubject: ${subject}\n\n${body}`;
 document.getElementById('copy-status').textContent='';
 document.getElementById('form-status').textContent='Your email draft is ready. Choose how to send it. Nothing has been sent yet.';
 emailDialog.showModal();
});
document.getElementById('close-email').addEventListener('click',()=>emailDialog.close());
document.getElementById('copy-email').addEventListener('click',async()=>{
 const draft=document.getElementById('email-draft'),status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText(draft.value);status.textContent='Copied. Paste this into an email and send it to service@airpulseaz.com.';}
 catch{draft.focus();draft.select();status.textContent='Select and copy the draft below, then paste it into your email.';}
});
