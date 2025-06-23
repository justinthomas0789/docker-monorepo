import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_user' })
  getUser(id: string): string {
    return `User with ID ${id}`;
  }
}