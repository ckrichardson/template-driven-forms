import { Observable } from 'rxjs';
import { ToDoService } from '../to-do/to-do-service.service';

export const toDoServiceMock = {
  clear: new Observable(),
  save: new Observable(),
  clearList: () => {},
  saveList: () => {},
} as ToDoService;
