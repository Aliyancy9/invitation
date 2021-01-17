 export interface Email {
  name: string
  email: string
}
 
const registerEmail = async (registeredEmail: Email) => {

  const response = await fetch(`https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ ...registeredEmail })
  })
  
  if (response.status !== 200) {

    return response.json().catch(console.error)
  }
  return await response.json()
}
  
export default registerEmail