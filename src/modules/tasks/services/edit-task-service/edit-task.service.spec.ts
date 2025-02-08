import { Test, TestingModule } from '@nestjs/testing';
import { EditTaskService } from './edit-task.service';

describe('EditTaskService', () => {
  let service: EditTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditTaskService],
    }).compile();

    service = module.get<EditTaskService>(EditTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
