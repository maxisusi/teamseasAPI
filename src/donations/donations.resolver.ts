import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { OrderByParams } from 'src/graphql';
import { DonationsService } from './donations.service';

import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput,
  ) {
    // Create donation
    const created = await this.donationsService.create(createDonationInput);
    // Getting the total of donation
    const total = await this.donationsService.getTotal();

    // Publishing the event with the shape of the data we want in return
    pubSub.publish('totalUpdated', { totalUpdated: { total } });

    // Returning the donation that has been created
    return created;
  }

  @Subscription()
  totalUpdated() {
    // Creating the event handler when we want to get the total
    return pubSub.asyncIterator('totalUpdated');
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id });
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal();
  }
}
