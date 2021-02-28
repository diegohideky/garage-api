const API = 'http://localhost:3000'

export class Service {
  headers: any = { 'X-IP-ADDRESS': null }

  constructor(ipAddress: string) {
    this.headers = {
      'X-IP-ADDRESS': ipAddress,
      'Content-Type': 'application/json'
    }
  }

  async getList() {
    return fetch(API, { headers: this.headers })
      .then((response) => {
        if (response.status !== 200) throw Error('something went wrong')
        return response.json() 
      })
  }

  async toggleMarker(carId: string) {
    return fetch(`${API}/marker`, {
      headers: this.headers,
      method: 'post',
      body: JSON.stringify({ carId })
    })
      .then((response) => {
        if (response.status !== 200) throw Error('something went wrong')
        return response.json() 
      })
  }
}
