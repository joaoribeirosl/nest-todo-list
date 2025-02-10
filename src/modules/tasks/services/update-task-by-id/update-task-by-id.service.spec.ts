import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskByIdService } from './update-task-by-id.service';

describe('UpdateTaskByIdService', () => {
  let service: UpdateTaskByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTaskByIdService],
    }).compile();

    service = module.get<UpdateTaskByIdService>(UpdateTaskByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
