import Client, { Server } from 'nextcloud-node-client'
import { Handler, NextFunction, Request, Response } from 'express'

const uploadImage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(process.env.NEXTCLOUD_PASSWORD, process.env.NEXTCLOUD_USERNAME, process.env.NEXTCLOUD_URL)
  if (!req.file) {
    return res.status(404).send('Missing file')
  }
  const deliveryId = req.params.id
  try {
    const server = new Server({
      basicAuth: {
        password: process.env.NEXTCLOUD_PASSWORD || 'password',
        username: process.env.NEXTCLOUD_USERNAME || 'username'
      },
      url: `https://${process.env.NEXTCLOUD_URL || 'localhost'}`
    })

    const client = new Client(server)
    let folder = await client.getFolder(`/deliveries/${deliveryId}`)
    if (!folder) {
      folder = await client.createFolder(`/deliveries/${deliveryId}`)
    }
    const file = await folder.createFile(
      `${deliveryId}-${Date.now()}.${req.file.mimetype.split('/')[1]}`,
      req.file.buffer
    )
    return res.status(200).send({ fileName: file.name })
  } catch (err) {
    return next(err)
  }
}

const imageHandler = {
  uploadImage
}

export default imageHandler
