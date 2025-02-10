import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUserByIdService } from './update-user-by-id.service'

describe('UpdateUserByIdService', () => {
  let service: UpdateUserByIdService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserByIdService],
    }).compile()

    service = module.get<UpdateUserByIdService>(UpdateUserByIdService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
