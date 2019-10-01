// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/testlab
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as Dockerode from 'dockerode';
import {DockerOptions} from 'dockerode';

export class DockerClient {
  readonly docker: Dockerode;
  constructor(options?: DockerOptions) {
    this.docker = new Dockerode(options);
  }

  /**
   * Pull a docker image
   * @param image - Docker image
   * @param options
   * @param auth
   */
  async pull(image: string, options = {}, auth?: object) {
    const stream = await this.docker.pull(image, options, auth);
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.docker.modem.followProgress(stream, (err: unknown, res: unknown) =>
        err ? reject(err) : resolve(res),
      );
    });
  }

  /**
   * Run a docker container from the image
   * @param image - Docker image
   * @param cmd - Command
   * @param createOptions - Options to create the container
   * @param startOptions - Options to start the container
   */
  async run(
    image: string,
    cmd: string[],
    createOptions?: object,
    startOptions?: object,
  ) {
    return this.docker.run(
      image,
      cmd,
      process.stdout,
      createOptions,
      startOptions,
    );
  }
}
