import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";


@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Get()
    async getAllTask(){
        return this.taskService.getAllTasks();
    }

    @Get(':id')
    async getById(@Param('id') id:String){
        const taskFound = await this.taskService.getTaskById(Number(id));
        if(!taskFound) throw new NotFoundException("La tarea no existe")
        return taskFound
    }


    @Post()
    async createTask(@Body() data: Task){
        return this.taskService.createTask(data);
    }

    @Put(':id')
    async updateTask(@Param('id') id:string ,@Body() data: Task){
        try{
            return await this.taskService.updateTask(Number(id), data);
        }catch(error){
            throw new NotFoundException("La tarea no existe")
        }
    }

    @Delete(':id')
    async deleteById(@Param('id') id:String){
        try{
            return await this.taskService.deleteTask(Number(id));
        }catch(error){
            throw new NotFoundException("La tarea no existe")
        }
    }
}