import Client, { Server } from 'nextcloud-node-client'
import { Handler, NextFunction, Request, Response } from 'express'
import deliveryController from '../controller/delivery.controller'
import { v4 as uuidv4 } from 'uuid'

const nextServer = new Server({
  basicAuth: {
    password: process.env.NEXTCLOUD_PASSWORD || 'password',
    username: process.env.NEXTCLOUD_USERNAME || 'username'
  },
  url: `https://${process.env.NEXTCLOUD_URL || 'localhost'}`
})
const nextClient = new Client(nextServer)

const uploadImage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(404).send('Missing file')
  }
  const deliveryId = req.params.id
  try {
    let folder = await nextClient.getFolder(`/deliveries/${deliveryId}`)
    if (!folder) {
      folder = await nextClient.createFolder(`/deliveries/${deliveryId}`)
    }
    const file = await folder.createFile(`${uuidv4()}.${req.file.mimetype.split('/')[1]}`, req.file.buffer)
    await deliveryController.addImageToDelivery(deliveryId, file.baseName, req.mainShop)
    return res.status(200).send({ fileName: file.baseName })
  } catch (err) {
    return next(err)
  }
}

const getImage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const { deliveryId, imageId } = req.query
  if (!deliveryId || !imageId) {
    return res.status(400).send('Missing query parameters')
  }
  try {
    const file = await nextClient.getFile(`/deliveries/${deliveryId}/${imageId}`)
    if (!file) {
      return res.status(400).send('File not found')
    }
    const buffer = await file.getContent()
    return res.status(200).send(buffer)
  } catch (err) {
    return next(err)
  }
}

const deleteImage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const { deliveryId, imageId } = req.body
  if (!deliveryId || !imageId) {
    return res.status(400).send('Missing body parameters')
  }
  try {
    const file = await nextClient.getFile(`/deliveries/${deliveryId}/${imageId}`)
    if (!file) {
      return res.status(400).send('File not found')
    }
    await file.delete()
    await deliveryController.removeImageFromDelivery(deliveryId, imageId, req.mainShop)
    return res.status(200).send({ fileName: file.baseName })
  } catch (err) {
    return next(err)
  }
}

const imageHandler = {
  uploadImage,
  getImage,
  deleteImage
}

export default imageHandler
