import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateTaskDto } from '../../../../src/modules/tasks/dto/create-task.dto';
import { PrismaService } from '@module/prisma/services/prisma.service';
import { DecodeTokenService } from '@module/auth/services/decode-token.service';
import { CreateTaskService } from '@module/tasks/services/create-task.service';

describe('CreateTaskService', () => {
  let createTaskService: CreateTaskService;
  let prismaService: PrismaService;
  let decodeTokenService: DecodeTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: DecodeTokenService,
          useValue: {
            decodeToken: jest.fn(),
          },
        },
      ],
    }).compile();

    createTaskService = module.get<CreateTaskService>(CreateTaskService);
    prismaService = module.get<PrismaService>(PrismaService);
    decodeTokenService = module.get<DecodeTokenService>(DecodeTokenService);
  });

  it('should create a task successfully', async () => {
    const mockUser = {
      id: 1,
      name: 'test user',
      email: 'test@email.com',
      password: 'hashedpassword',
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest.spyOn(decodeTokenService, 'decodeToken').mockResolvedValue(mockUser);

    const mockTask = {
      id: 1,
      title: 'test task',
      description: 'description',
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest.spyOn(prismaService.task, 'create').mockResolvedValue(mockTask);

    const createTaskDto: CreateTaskDto = {
      title: 'test task',
      description: 'description',
    };

    const result = await createTaskService.execute(
      createTaskDto,
      'valid-token',
    );

    expect(result).toEqual({
      userId: 1,
      taskId: 1,
      createdTask: createTaskDto,
    });

    expect(decodeTokenService.decodeToken).toHaveBeenCalledWith('valid-token');
    expect(prismaService.task.create).toHaveBeenCalledWith({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        userId: mockUser.id,
      },
    });
  });

  it('should throw NotFoundException if user not exists', async () => {
    jest.spyOn(decodeTokenService, 'decodeToken').mockResolvedValue(null);

    const createTaskDto: CreateTaskDto = {
      title: 'test task',
      description: 'description',
    };

    await expect(
      createTaskService.execute(createTaskDto, 'invalid-token'),
    ).rejects.toThrow(NotFoundException);
  });
});
