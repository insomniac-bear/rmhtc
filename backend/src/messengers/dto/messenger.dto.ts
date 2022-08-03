import { Messenger } from '../entity/messenger.entity'
import { IMessenger } from '../types'

export const createContact = (messenger: Messenger): IMessenger => {
  return {
    value: messenger?.value,
    type: messenger?.messengerType?.value,
  }
}