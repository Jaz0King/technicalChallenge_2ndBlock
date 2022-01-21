import {saveTask, getTask, onGetTask, deleteTask, editTask, updateTask} from './modules/data.js';
const taskForm = document.getElementById("task-form")
const taskCont = document.getElementById('task-container')
let editing = false;
let id = '';


//Evento para arrancar la app al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot)=> {

    let html = ''
    //Mostrar las tareas dinámicamente
    querySnapshot.forEach(doc =>{
        const prop = doc.data()
        prop.id = doc.id
        html += `
        <tbody id="tab">
        <tr id="tab1">
          <th scope="row" id="enu">${prop.fechaIni} </th>
          <td value="${prop}" data-bs-target="${prop.id}"> ${prop.nombre} </td>
          <td> 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${prop.id}">
              Ver Mas
            </button>
            <button type="button" class="btn-delete" id="btnDone" data-id="${prop.id}">Cumplido</button>
            
          </td>
        </tr>
      </tbody>
                           
        <!-- Modal -->
        <div class="modal fade" id="exampleModal${prop.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">${prop.nombre} </h3>
              </div>
              <div class="modal-body">
              <ul class="list-group list-group-flush">
             <li class="list-group-item"><b>Descripción:</b> ${prop.description} </li>
             <li class="list-group-item"><b>Fecha de Inicio:</b> ${prop.fechaIni} </li>
             </ul>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn-edit" id="btnEdit" data-id="${prop.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>   
        </div>
     </div> `;    
    
    });

    taskCont.innerHTML = html;
    const btnDel = taskCont.querySelectorAll('.btn-delete')
    btnDel.forEach(btn => {
      btn.addEventListener('click', ({target:{dataset}}) => {
          alert("Congratulations");
          deleteTask(dataset.id)
      })
    })

    const btnEdit = taskCont.querySelectorAll('.btn-edit')
    btnEdit.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const doc = await editTask(e.target.dataset.id);
        const task = doc.data()
        

        taskForm['title'].value = task.nombre
        taskForm['descrip'].value = task.description
        taskForm['fechaProp'].value = task.fechaIni
      
        editing = true;
        id = doc.id;
        
    })

  })
 })
})

// Función para guardar los datos ingresados 
taskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const title = taskForm['title']
    const description = taskForm['descrip']
    const fechaIni = taskForm['fechaProp']
    //const fechaFin = taskForm['fechaPropCard']
 
    if (editing) {
      updateTask(id, {
        nombre: title.value,
        description: description.value, 
        fechaIni: fechaIni.value
      })
    }else{
      saveTask(title.value, description.value, fechaIni.value)
    }

    editing=false

    taskForm.reset()

})

// Función para llamar el calendario
$(function() {
    $('#datepicker').datepicker();
  });
  $(function() {
    $('#datepicker2').datepicker();
  });

// Botones de regreso a listas de propósitos y salida 
const btnListas = document.getElementById('btnListas')
const btnReturn = document.getElementById('btnReturn')
export const listaP = localStorage['objectToPass']
 

  //Pinta dinamicamente el nombre de la lista de propósitos
if (listaP == 'personal') {
  let titleP = document.getElementById('tipoLista')
  titleP.innerHTML = `<h1> PROPÓSITOS PERSONALES </h1>` 
} else {
  if (listaP == 'profesional') {
      let titleP = document.getElementById('tipoLista')
      titleP.innerHTML = `<h1> PROPÓSITOS PROFESIONALES </h1>`
      
  } else {
    if (listaP == 'relaciones') {
      let titleP = document.getElementById('tipoLista')
      titleP.innerHTML = `<h1> PROPÓSITOS RELACIONES </h1>`
    }  else {
      if (listaP == 'familia') {
       
        let titleP = document.getElementById('tipoLista')
        titleP.innerHTML = `<h1> PROPÓSITOS FAMILIARES </h1>`
      } else {
          if (listaP == 'salud') {
            let titleP = document.getElementById('tipoLista')
            titleP.innerHTML = `<h1> PROPÓSITOS SALUD Y APRENDIZAJE </h1>`
          }
        }
    }
  }
}


btnReturn.addEventListener('click', () => {
    window.location.href = "./logIn.html"
  })

btnListas.addEventListener('click', () => {
    window.location.href = "./listas.html"
  })  
