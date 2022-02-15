const sendSMS = async (username: string, receiverNumber: string, content: string): Promise<string> => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('DEVELOPMENT: SMS would have been sent.')
    console.log('Username: ', username)
    console.log('receiverNumber: ', receiverNumber)
    console.log('Content: ', content)
  } else {
    // Call third-party service to send real sms
  }
  return Promise.resolve('ok')
}

export default sendSMS
