import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_form' })
  getForm(id: string): string {
    return `Form with ID ${id}`;
  }
}