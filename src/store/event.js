import { observable, action } from 'mobx'

export default class Event {

  @observable loading = false
  @observable events = []
  @observable event = {}

  constructor(events = [], event = {}){
    this.events = events
    this.event = event
  }

  @action getMoreEvents(){
    
  }
  
}

