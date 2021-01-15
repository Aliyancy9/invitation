 export interface Email {
  name: string
  email: string
}
 
const fetchWrapper = (registeredEmail: Email) => {

  return fetch(`https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
    method: "POST",
    body: JSON.stringify({ registeredEmail })
  
  })
  .then((response) => {
    console.log(response)
    if (response.status !== 200) {

      // if (!response.bodyUsed) return Promise.reject(response)
      return response.json().catch(console.error)
    }
    return response.json()
  })
}
  
export default fetchWrapper