import { PrismaService } from "@module/prisma/services/prisma.service";
import { UpdateTaskDto } from "@module/tasks/dto/update-task.dto";
import { UpdateTaskByIdService } from "@module/tasks/services/update-task-by-id.service";
import { NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";

describe('UpdateTaskByIdService', () => {
    let updateTaskByIdService: UpdateTaskByIdService;
    let prismaService: PrismaService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UpdateTaskByIdService,
          {
            provide: PrismaService,
            useValue: {
              task: {
                update: jest.fn(),
                findUnique: jest.fn(),
              },
            },
          },
        ],
      }).compile();
  
      updateTaskByIdService = module.get<UpdateTaskByIdService>(UpdateTaskByIdService);
      prismaService = module.get<PrismaService>(PrismaService);
    });
  
    it('should update a task successfully', async () => {

        const mockTask = {
            id: 1,
            title: 'test task',
            description: 'description',
            userId: 1,
            created_at: new Date(),
            updated_at: new Date(),
          };

          const updateTaskDto: UpdateTaskDto = {
            idTask: mockTask.id,
            title: 'updated title',
            description: 'updated desc',
          };
      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(mockTask);
      jest.spyOn(prismaService.task, 'update').mockResolvedValue(mockTask);
      await expect(updateTaskByIdService.execute(updateTaskDto)).resolves.toBeTruthy();
    });
  
    
  });