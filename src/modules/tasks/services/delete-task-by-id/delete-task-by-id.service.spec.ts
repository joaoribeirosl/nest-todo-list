import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTaskByIdService } from './delete-task-by-id.service';

describe('DeleteTaskByIdService', () => {
  let service: DeleteTaskByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteTaskByIdService],
    }).compile();

    service = module.get<DeleteTaskByIdService>(DeleteTaskByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
