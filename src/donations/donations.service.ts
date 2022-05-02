import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderByParams } from 'src/graphql';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}
  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput,
    });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};

    return this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: donationWhereUniqueInput,
    });
  }
}
