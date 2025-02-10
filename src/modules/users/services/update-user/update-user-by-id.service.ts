import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UpdateUserByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ idUser, name, email }: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: idUser } });
    if (!user) throw new NotFoundException('User not found!');
    const userEmailExists = await this.prisma.user.findFirst({
      where: { email },
    });
    if (userEmailExists && email !== user.email)
      throw new ConflictException('There is another user with this email!');

    const updatedUser = await this.prisma.user.update({
      where: { id: idUser },
      data: { name, email },
    });

    return updatedUser;
  }
}
