const canvas = document.getElementById('wfCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;
let mouse = {x:null, y:null};

class Particle {
    constructor(){
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.origY = this.y;
        this.speed = 0.2 + Math.random()*0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 1 + Math.random()*2;
    }
    update(){
        this.angle += 0.01;
        this.y = this.origY + Math.sin(this.angle*2) * 20;
    }
    draw(){
        ctx.fillStyle = 'rgba(0,200,255,0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}

function initParticles(){
    particles.length = 0;
    for(let i=0; i<particleCount; i++){
        particles.push(new Particle());
    }
}

function draw(){
    ctx.clearRect(0,0,w,h);

    for(let i=0;i<particles.length;i++){
        let p1 = particles[i];
        p1.update();
        p1.draw();
        for(let j=i+1;j<particles.length;j++){
            let p2 = particles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if(dist < 120){
                ctx.strokeStyle = `rgba(0,200,255,${1 - dist/120} )`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        if(mouse.x!==null){
            const distMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
            if(distMouse < 100){
                ctx.strokeStyle = `rgba(0,200,255,${1 - distMouse/100} )`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}

window.addEventListener('resize', ()=>{
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initParticles();
});
window.addEventListener('mousemove', e=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseout', ()=>{mouse.x=null; mouse.y=null;});

initParticles();
draw();

// Set today's date as default for the date input
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('todayDate');
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if(mm < 10) mm = '0' + mm;
    if(dd < 10) dd = '0' + dd;

    const formattedToday = `${yyyy}-${mm}-${dd}`;
    dateInput.value = formattedToday;
});

const form = document.getElementById('inquiryForm');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');

form.addEventListener('submit', function(e){
    e.preventDefault(); 
    popup.classList.add('active');
});

closeBtn.addEventListener('click', function(){
    popup.classList.remove('active');
    form.reset();
    const today = new Date();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    const yyyy = today.getFullYear();
    if(mm < 10) mm = '0' + mm;
    if(dd < 10) dd = '0' + dd;
    form.todayDate.value = `${yyyy}-${mm}-${dd}`;
});
