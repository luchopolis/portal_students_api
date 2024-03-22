import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthDto } from "./dto/auth-dto";
import { PrismaService } from "src/common/providers/db.provider";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findSignIn(auth: AuthDto) {
    const { email } = auth;

    const userData = await this.prismaService.user.findFirst({
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        email,
      },
    });
    return userData;
  }
}
