import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly Users: Model<UserDocument>) {}

  async login(email: string, password: string) {
    const candidate = await this.Users.findOne({ email });

    if (candidate) {
      const passwordResult = await bcrypt.compare(password, candidate.password);
      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
          },
          process.env.JWT,
          { expiresIn: '1h' },
        );
        return {
          status: HttpStatus.OK,
          data: { token: `Bearer ${token}` },
        };
      } else {
        return {
          status: HttpStatus.UNAUTHORIZED,
          data: { message: 'Password not correct. Write again' },
        };
      }
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'User with this email not found' },
      };
    }
  }

  async register(email: string, password: string) {
    const candidate = await this.Users.findOne({ email });

    if (candidate) {
      return {
        status: HttpStatus.CONFLICT,
        data: { message: 'User with this email already exists' },
      };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = { email, password: hashedPassword };

      try {
        await this.Users.create(user);
        return {
          status: HttpStatus.CREATED,
          data: user,
        };
      } catch (e) {
        console.log(e);
        throw new HttpException('failed to registration', HttpStatus.FAILED_DEPENDENCY);
      }
    }
  }
}
