import { Docket } from '../src/domain/courts/docket';
import { Extract } from '../src/domain/courts/extract';
import { MasterFacility } from '../src/domain/registries/master-facility';
import * as uuid from 'uuid';
import { Facility } from '../src/domain/transfers/facility';
import { Manifest, Summary } from '../src/domain';

export const getTestDockets = (count = 2, dcount = 2) => {
  const data: Docket[] = [];
  for (let i = 0; i < count; i++) {
    const docket = new Docket(`DC${i}`, `Docket-${i}`);
    for (let j = 0; j < dcount; j++) {
      docket.addExtract(new Extract(`Ex${j}`, `Extract-${j}`, false, i));
    }
    data.push(docket);
  }
  return data;
};

export const getTestMasterFacilities = (count = 2) => {
  const data: MasterFacility[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new MasterFacility(uuid.v1(), i * 12, `Fname${i}`));
  }
  return data;
};

export const getTestFacilities = (count = 2) => {
  const dockets = getTestDockets();
  const masterFacilities = getTestMasterFacilities();
  const facilities: Facility[] = [];
  const manifests: Manifest[] = [];
  for (let i = 0; i < count; i++) {
    const mfs = getManifests();
    const fac = new Facility(uuid.v1(), i * 12, `fname${i}`);
    getManifests().map(m => {
      m.code = fac.code;
      m.facility = fac._id;
      manifests.push(m);
    });
    fac.manifests = manifests.map(n => n._id);
    fac.summaries = getSummaries();
    facilities.push(fac);
  }
  return { dockets, masterFacilities, facilities, manifests };
};
const getManifests = (count = 2) => {
  const data: Manifest[] = [];
  for (let i = 0; i < count; i++) {
    data.push(
      new Manifest(
        uuid.v1(),
        (i + 1) * 45,
        `fac${i}`,
        new Date(),
        new Date(),
        'HTS',
        (i + 1) * 45,
        '',
        i === 1,
      ),
    );
  }
  return data;
};
const getSummaries = () => {
  const data: Summary[] = [];

  data.push(
    new Summary(
      { name: 'HTS' },
      { name: 'HtsClientExtract' },
      100,
      100,
      new Date(),
    ),
  );
  data.push(
    new Summary(
      { name: 'HTS' },
      { name: 'HtsClientTestsExtract' },
      200,
      0,
      new Date(),
    ),
  );
  return data;
};

export const getTestStatsData = () => {
  const dockets = JSON.parse(
    '[\n' +
      '  {\n' +
      '    "_id": "' +
      uuid.v1() +
      '",\n' +
      '    "name": "NDWH",\n' +
      '    "display": "NDWH",\n' +
      '    "extracts": [\n' +
      '      {\n' +
      '        "_id": "6dc933e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientExtract",\n' +
      '        "display": "All Patients",\n' +
      '        "isPatient": true,\n' +
      '        "rank": 1\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc934e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientArtExtract",\n' +
      '        "display": "ART Patients",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 2\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc935e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientBaselineExtract",\n' +
      '        "display": "Patient Baselines",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 3\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc936e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientStatusExtract",\n' +
      '        "display": "Patient Status",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 4\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc937e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientLabExtract",\n' +
      '        "display": "Patient Labs",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 5\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc938e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientPharmacyExtract",\n' +
      '        "display": "Patient Pharmacy",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 6\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc93746-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientVisitExtract",\n' +
      '        "display": "Patient Visit",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 7\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc939e0-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "PatientAdverseEventExtract",\n' +
      '        "display": "Patient Adverse Events",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 8\n' +
      '      }\n' +
      '    ]\n' +
      '  },\n' +
      '  {\n' +
      '    "_id": "' +
      uuid.v1() +
      '",\n' +
      '    "name": "HTS",\n' +
      '    "display": "HTS",\n' +
      '    "extracts": [\n' +
      '      {\n' +
      '        "_id": "6dc93890-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsClientExtract",\n' +
      '        "display": "Hts Clients",\n' +
      '        "isPatient": true,\n' +
      '        "rank": 1\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc939bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsClientTestsExtract",\n' +
      '        "display": "Hts Client Tests",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 2\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc949bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsClientLinkageExtract",\n' +
      '        "display": "Hts Client Linkage",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 3\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc959bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsTestKitsExtract",\n' +
      '        "display": "Hts Test Kits",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 4\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc969bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsClientTracingExtract",\n' +
      '        "display": "Hts Client Tracing",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 5\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc979bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsPartnerTracingExtract",\n' +
      '        "display": "Hts Partner Tracing",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 6\n' +
      '      },\n' +
      '      {\n' +
      '        "_id": "6dc989bc-bf1e-11e9-9cb5-2a2ae2dbcce4",\n' +
      '        "name": "HtsPartnerNotificationServicesExtract",\n' +
      '        "display": "Hts Partner Notification Services",\n' +
      '        "isPatient": false,\n' +
      '        "rank": 7\n' +
      '      }\n' +
      '    ]\n' +
      '  }\n' +
      ']',
  );

  const masterfacilities = JSON.parse(
    '[\n' +
      '  {\n' +
      '    "_id": "' +
      uuid.v1() +
      '",\n' +
      '    "code": 12618,\n' +
      '    "name": "Mwala Hospital",\n' +
      '    "county": {\n' +
      '      "_id": "9eb15a92-bb7b-11e9-9cb5-2a2ae2dbcce4",\n' +
      '      "code": 16,\n' +
      '      "name": "MACHAKOS"\n' +
      '    },\n' +
      '    "mechanism": {\n' +
      '      "_id": "9eb13e4a-bb7b-11e9-9cb5-2a2ae2dbcce4",\n' +
      '      "code": "18504",\n' +
      '      "name": "UMB Timiza",\n' +
      '      "implementationName": "UMB Timiza",\n' +
      '      "agency": "9eb13e4a-bb7b-11e9-9cb5-2a2ae2dbcce4"\n' +
      '    }\n' +
      '  },\n' +
      '  {\n' +
      '    "_id": "' +
      uuid.v1() +
      '",\n' +
      '    "code": 14950,\n' +
      '    "name": "Kitengela Health Centre",\n' +
      '    "county": {\n' +
      '      "_id": "9eb175a4-bb7b-11e9-9cb5-2a2ae2dbcce4",\n' +
      '      "code": 34,\n' +
      '      "name": "KAJIADO"\n' +
      '    },\n' +
      '    "mechanism": {\n' +
      '      "_id": "9eb140ca-bb7b-11e9-9cb5-2a2ae2dbcce4",\n' +
      '      "code": "13588",\n' +
      '      "name": "Afya Ziwani",\n' +
      '      "implementationName": "Afya Ziwani",\n' +
      '      "agency": "9eb140ca-bb7b-11e9-9cb5-2a2ae2dbcce4"\n' +
      '    }\n' +
      '  }\n' +
      ']\n',
  );

  return { dockets, masterfacilities };
};
