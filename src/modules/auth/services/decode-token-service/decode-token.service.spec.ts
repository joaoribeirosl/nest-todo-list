import { Test, TestingModule } from '@nestjs/testing'
import { DecodeTokenService } from './decode-token.service'

describe('DecodeTokenService', () => {
  let service: DecodeTokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecodeTokenService],
    }).compile()

    service = module.get<DecodeTokenService>(DecodeTokenService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
