import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'task id',
    example: '1',
  })
  @IsNotEmpty()
  idTask: number;

  @ApiProperty({
    description: 'The title of the task',
    example: 'test task',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'this task is a test',
    required: false,
  })
  @IsString()
  description?: string;
}
