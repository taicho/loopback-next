// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/test-repository-postgresql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {DefaultCrudRepository} from '@loopback/repository';
import {
  CrudRepositoryCtor,
  crudRepositoryTestSuite,
} from '@loopback/repository-tests';
import {POSTGRESQL_CONFIG, POSTGRESQL_FEATURES} from './postgresql.datasource';

describe('PostgreSQL + DefaultCrudRepository', () => {
  crudRepositoryTestSuite(
    POSTGRESQL_CONFIG,
    // Workaround for https://github.com/microsoft/TypeScript/issues/31840
    DefaultCrudRepository as CrudRepositoryCtor,
    POSTGRESQL_FEATURES,
  );
});
