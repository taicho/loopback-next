// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/testlab
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {DockerClient} from '../..';
import {expect} from '../../expect';

describe('docker', function() {
  let client: DockerClient;

  // eslint-disable-next-line no-invalid-this
  this.timeout(30000);

  before(async () => {
    client = new DockerClient();
    await client.pull('alpine:latest');
  });

  it('inspects an image by name', async () => {
    const image = client.docker.getImage('alpine:latest');
    const info = await image.inspect();
    expect(info).containEql({RepoTags: ['alpine:latest']});
  });

  it('runs a docker container', async () => {
    const [data, container] = await client.run(
      'alpine',
      ['sh', '-c', 'uname -a'],
      // {HostConfig: {AutoRemove: true}},
    );
    expect(data.StatusCode).to.eql(0);
    await container.remove();
  });
});
