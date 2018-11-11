import { observable, action } from 'mobx'
import fetch from 'isomorphic-fetch'

export default class Event {

  @observable loading = false
  @observable users = []

  constructor(users) {
    this.users = users
  }

  @action getMoreUsers(){
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(res => {
        this.users = res.results
      })
  }
  
}

