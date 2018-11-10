import { observable } from 'mobx'

export default class Event {

  @observable loading = false
  @observable users = []

  constructor(users) {
    this.users = users
  }
}

