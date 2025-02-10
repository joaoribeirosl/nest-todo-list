import { Test, TestingModule } from '@nestjs/testing'
import { GetAllTasksByUserIdService } from './get-all-tasks-by-user-id.service'

describe('GetAllTasksByUserIdService', () => {
  let service: GetAllTasksByUserIdService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllTasksByUserIdService],
    }).compile()

    service = module.get<GetAllTasksByUserIdService>(GetAllTasksByUserIdService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
