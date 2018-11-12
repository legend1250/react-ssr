import { observable } from 'mobx'

export default class Network{

  @observable requestError = null

  constructor(requestError){
    this.requestError = requestError
  }
}