// Define UI variables:
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// load all event listeners:
LoadEventListeners()
// eikhane LoadEventListeners() ami age call kore rakhsi and ei LoadEventListeners() function e ami locally sob eventlisteners gula ke likhbo

function LoadEventListeners() {

    // dom load event(mane local storage e save kora data gula jate amar html eo dekhay tar jonne):
    document.addEventListener("DOMContentLoaded",getTasks)
  
    form.addEventListener("submit",addTask);

    // for removing task mane (X) e click korle jate li ti remove hoy!
    taskList.addEventListener("click",removeTask)

    // for removing whole li to using clear tasks button:
 // Clear task event
   clearBtn.addEventListener('click', clearTasks);
//    for filtering:

   filter.addEventListener('keyup', filterTasks);



}

function getTasks()
{
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function(task){

        const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Create text node and append to li
li.appendChild(document.createTextNode(task));

taskList.appendChild(li)


const link = document.createElement('a')
link.className = "delete-item secondary-content"
link.innerHTML = '<i class="fa fa-remove"></i>'
li.appendChild(link)




    })




}




function addTask(e)
{
   e.preventDefault()

   if(taskInput.value=== ""){
       alert("please! add task!")
   }


   // creating li elements:
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));

taskList.appendChild(li)


const link = document.createElement('a')
link.className = "delete-item secondary-content"
link.innerHTML = '<i class="fa fa-remove"></i>'
li.appendChild(link)

// store taskInput to localStorage

storeTaskInLocalStorage(taskInput.value);




taskInput.value = ""

  


}

// store taskInput to localStorage:

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
      tasks = []
  }
  else{
      tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));


}










// for removing task:

function removeTask(e){
   if(e.target.parentElement.classList.contains("delete-item"))
   {
       if(confirm("Are You Sure To Remove This!!"))
       {
           e.target.parentElement.parentElement.remove()

        //    eikhane e.target.parentElement holo <a></a> and  e.target.parentElement.parentElement holo li,jehuto(x) e click korle li remove hobe tai e.target.parentElement.parentElement.remove() diyechi;

         // Remove from LS(mane html e remove hobe and localstorage eo remove hobe:)
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

          
         
       }
   }
   
}

function removeTaskFromLocalStorage(taskItem){

    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(function(task,index){
      if(taskItem.textContent === task)
      {

          tasks.splice(index,1)

      }


    })

    localStorage.setItem('tasks',JSON.stringify(tasks))


}






// for removing whole li:
function clearTasks() {
//   taskList.innerHTML = ""   

//   more faster:

 if(confirm("Are You Sure To Remove all of This!!"))
 {
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild)
    }
    // clear whole local storage when click clear tasks button:
    clearFromLocalUsingBtn();
  

 }
  
  
}

// clear whole local storage when click clear tasks button:


function clearFromLocalUsingBtn(){
    localStorage.clear()
}
  

// for filtering:

function filterTasks(e){
  let text = e.target.value.toLowerCase();
  

  document.querySelectorAll(".collection-item").forEach(function(task){
       
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display = "block";
      
    }
    else{
        task.style.display = "none"
    }


  })

 

 
}


