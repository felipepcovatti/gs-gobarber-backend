import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '234242341',
      user_id: '1234233',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('234242341');
  });

  it('should not be able to create two appointments on the same hour', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '234242341',
      user_id: '1234233',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '234242341',
        user_id: '1234233',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
