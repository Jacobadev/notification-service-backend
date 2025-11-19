import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPreferenceDto: CreatePreferenceDto) {
    return this.prisma.preference.create({
      data: createPreferenceDto,
    });
  }

  async findAll(userId: string) {
    return this.prisma.preference.findMany({
      where: { userId },
    });
  }

  async update(id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.prisma.preference.update({
      where: { id },
      data: updatePreferenceDto,
    });
  }
}
