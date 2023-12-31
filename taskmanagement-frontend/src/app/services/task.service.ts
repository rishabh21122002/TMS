import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ITask,
  ITaskTypeOption,
  ITypePercentage,
} from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpclient: HttpClient) {}

  getTaskList(): Observable<Array<ITask>> {
    return this.httpclient
      .get('http://localhost:8080/api/v1/task')
      .pipe(map((d: any) => d));
  }
  postTaskList(task: ITask): Observable<ITask> {
    return this.httpclient
      .post('http://localhost:8080/api/v1/task', task)
      .pipe(map((d: any) => d));
  }

  updateTask(task: ITask, id: string): Observable<ITask> {
    return this.httpclient
      .put(`http://localhost:8080/api/v1/task/${id}`, task)
      .pipe(map((d: any) => d));
  }
  deleteTask(id: string) {
    return this.httpclient.delete(`http://localhost:8080/api/v1/task/${id}`);
  }

  getTaskById(id: string): Observable<ITask> {
    return this.httpclient
      .get(`http://localhost:8080/api/v1/task/${id}`)
      .pipe(map((d: any) => d));
  }

  getTypePercentage(): Observable<any> {
    return this.httpclient
      .get(`http://localhost:8080/api/v1/task/vData/percentcounttype`)
      .pipe(map((d: any) => d));
  }

  getTypeOptions(): Array<ITaskTypeOption> {
    return [{ type: 'done' }, { type: 'todo' }, { type: 'pending' }];
  }

}
