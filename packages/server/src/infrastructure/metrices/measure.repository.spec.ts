import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { getTestFacilities, getTestMeasures } from '../../../test/test.data';
import { MetricsInfrastructureModule } from './metrics-infrastructure.module';
import { IMeasureRepository } from '../../domain/metrices/measure-repository.interface';

describe('Measure Repository Tests', () => {
  let module: TestingModule;
  let repository: IMeasureRepository;
  const dbHelper = new TestDbHelper();
  const { facilities } = getTestFacilities();
  const testFacilities = facilities;
  const { testMeasures, testMetrics } = getTestMeasures(testFacilities[0]._id);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MetricsInfrastructureModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('facilities', facilities);
    await dbHelper.seedDb('measures', testMeasures);
    repository = module.get<IMeasureRepository>('IMeasureRepository');
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load Measures by Name', async () => {
    const data = await repository.getByName(
      testMeasures[0].area,
      testMeasures[0].name,
    );
    expect(data).not.toBeUndefined();
    Logger.debug(`${data.name}`);
  });
});
