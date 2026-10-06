// ApexPlanet Internship Task 2

// Responsive navigation
const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("show"));

// Contact form validation
const form=document.getElementById("contactForm");
const success=document.getElementById("success");
const error=(id,msg)=>document.getElementById(id+"Error").textContent=msg;
const validEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

form.addEventListener("submit",e=>{
  e.preventDefault();
  ["name","email","subject","message"].forEach(id=>error(id,""));
  success.textContent="";
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const subject=document.getElementById("subject").value.trim();
  const message=document.getElementById("message").value.trim();
  let ok=true;

  if(!name){error("name","Name is required.");ok=false}
  if(!email){error("email","Email is required.");ok=false}
  else if(!validEmail(email)){error("email","Enter a valid email.");ok=false}
  if(!subject){error("subject","Subject is required.");ok=false}
  if(!message){error("message","Message is required.");ok=false}
  else if(message.length<10){error("message","Minimum 10 characters.");ok=false}

  if(ok){success.textContent="✓ Form validated successfully!";form.reset()}
});

// Dynamic To-Do List
const input=document.getElementById("todoInput"),list=document.getElementById("todoList");
const todoForm=document.getElementById("todoForm"),count=document.getElementById("count");
const todoError=document.getElementById("todoError"),clear=document.getElementById("clear");
let tasks=[
  {text:"Complete ApexPlanet Task 2",done:false},
  {text:"Test the contact form",done:true}
];

function render(){
  list.innerHTML="";
  tasks.forEach((task,i)=>{
    const li=document.createElement("li");
    if(task.done)li.classList.add("completed");
    const check=document.createElement("button");
    check.textContent=task.done?"✓":"○";
    check.title="Complete / incomplete";
    check.onclick=()=>{tasks[i].done=!tasks[i].done;render()};
    const span=document.createElement("span");span.textContent=task.text;
    const del=document.createElement("button");del.textContent="Delete";del.className="delete";
    del.onclick=()=>{tasks.splice(i,1);render()};
    li.append(check,span,del);list.appendChild(li);
  });
  const active=tasks.filter(t=>!t.done).length;
  count.textContent=`${active} active task${active===1?"":"s"}`;
}
todoForm.addEventListener("submit",e=>{
  e.preventDefault();const text=input.value.trim();
  if(!text){todoError.textContent="Please enter a task first.";return}
  tasks.push({text,done:false});input.value="";todoError.textContent="";render();
});
clear.onclick=()=>{tasks=tasks.filter(t=>!t.done);render()};
render();
