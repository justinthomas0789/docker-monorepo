import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Resolver()
export class AppResolver {
  constructor(
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
    @Inject('FORMS_SERVICE') private formsClient: ClientProxy,
  ) {}

  @Query(() => String)
  async getUser(@Args('id') id: string) {
    return this.usersClient.send({ cmd: 'get_user' }, id).toPromise();
  }

  @Query(() => String)
  async getForm(@Args('id') id: string) {
    return this.formsClient.send({ cmd: 'get_form' }, id).toPromise();
  }
}