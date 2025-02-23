// delete-task.service.spec.ts
import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '@module/prisma/services/prisma.service';
import { DeleteTaskByIdService } from '@module/tasks/services/delete-task-by-id.service';

describe('DeleteTaskByIdService', () => {
  let deleteTaskByIdService: DeleteTaskByIdService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTaskByIdService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              delete: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    deleteTaskByIdService = module.get<DeleteTaskByIdService>(DeleteTaskByIdService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should delete a task successfully', async () => {

    const mockTask = {
        id: 1,
        title: 'test task',
        description: 'description',
        userId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

    jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(mockTask);
    jest.spyOn(prismaService.task, 'delete').mockResolvedValue(mockTask);
    await expect(deleteTaskByIdService.execute(mockTask.id.toString())).resolves.toBeTruthy();
  });

  it('should throw NotFoundException if task not exists', async () => {
    jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(null);
    await expect(deleteTaskByIdService.execute('id')).rejects.toThrow(NotFoundException);
  });
});