// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/pubsub
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/* eslint-disable @typescript-eslint/no-explicit-any */
import {ValueOrPromise} from '@loopback/context';

export type MessageHandler = (
  channel: string,
  message: any,
) => ValueOrPromise<void>;

export interface PubSubConnector {
  /**
   * Connect to the PubSub broker
   */
  connect(): ValueOrPromise<void>;
  /**
   * Disconnect from the PubSub broker
   */
  disconnect(): ValueOrPromise<void>;

  supportsWildcard(): boolean;

  /**
   * Publish a message to the channel
   * @param channel - Channel/topic
   * @param message - Message
   */
  publish(channel: string, message: any): Promise<void>;

  /**
   * Subscribe to a channel with an optional message handler
   * @param channel - Channel/topic
   * @param handler - Message handler
   */
  subscribe(channel: string, handler?: MessageHandler): Promise<Subscriber>;

  /**
   * Unsubscribe a subscriber
   * @param subscriber - Subscriber
   */
  unsubscribe(subscriber: Subscriber): Promise<void>;

  /**
   * Create a publisher
   * @param options Options for the publisher
   */
  createPublisher(options: object): Promise<Publisher>;

  /**
   * Create a subscriber
   * @param channel - Channel/topic
   * @param options - Options for the subscriber
   */
  createSubscriber(channel: string, options: object): Promise<Subscriber>;
}

/**
 * Message publisher
 */
export interface Publisher {
  publish(channel: string, message: any): Promise<void>;
}

/**
 * Message subscriber
 */
export interface Subscriber {
  close(): Promise<void>;
  closed: boolean;
  onMessage(handler: MessageHandler): void;
}
