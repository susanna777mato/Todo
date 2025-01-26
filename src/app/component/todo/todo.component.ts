import { Component } from '@angular/core';
import { Todo } from 'src/app/todo';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
    
  

  inputText = ""
  
  todoTask: Todo[] = []
  chexbox: Todo[] = []

  modifiedArray2: Todo[] = []

  newArray: any[] = [] 


  activeButton: string = 'all';




  onCheckboxChange(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    this.todoTask[index].completed = target.checked; 

    if ( this.activeButton === 'completed' && target.checked === false) {
      this.todoTask.splice(index, 1);
    }
    
  }


  setActiveButton(button: string): void {
    this.activeButton = button;

    if (this.activeButton === 'delete') {
        
          this.todoTask = [...this.newArray]
         
    }
    if (this.activeButton === 'completed') {
      this.todoTask = [...this.modifiedArray2]

      this.todoTask = this.todoTask.filter(task => 
        this.chexbox.some(item => item.id === task.id)
      );

    } 

    if(this.activeButton === 'all') {
       this.todoTask = [...this.modifiedArray2]
       console.log(this.todoTask, "all")
    }
    
  }

  chex(id: number, text: string) {
    
    const index = this.chexbox.findIndex(item => item.id === id);
    if (index === -1) {
      this.chexbox.push({ id, text, completed: true });
    } else {
      this.chexbox.splice(index, 1);
    }
     
  }
  delete(id: number): void {
 
    const removedTask = this.todoTask.find(item => item.id === id);
    this.todoTask = this.todoTask.filter(item => item.id !== id);
  
    if (removedTask && !this.newArray.some(item => item.id === id)) {
      this.newArray.push(removedTask);
    }
  
    this.modifiedArray2 = this.modifiedArray2.filter(item => item.id !== id);
  

  }


    button() {
        
      if(this.inputText !== '' && this.activeButton === 'all') {
         
        const todo: Todo = {
          id: Date.now(),
          text: this.inputText,
          completed: false
        }
        this.todoTask.push(todo)
         this.modifiedArray2 = [...this.todoTask]
         this.inputText = ""
      }

      else{
        this.inputText = ''
      }
        
    }
    
}

