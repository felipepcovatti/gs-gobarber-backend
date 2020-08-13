import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    const providersWithoutPassword = providers.map(({ password, ...rest }) => ({
      ...rest,
    }));

    return response.json(providersWithoutPassword);
  }
}

export default ProvidersController;
