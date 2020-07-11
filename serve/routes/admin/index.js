module.exports = app => {
  const express = require('express')
  // const router = express.Router()
  // const Category = require('../../models/Categoty')

  // router.post('/categories', async (req,res) => {
  //   const model =  await Category.create(req.body  )
  //   res.send(model)
  // })

  // router.put('/categories/:id', async (req,res) => {
  //   const model =  await Category.findByIdAndUpdate(req.params.id,req.body  )
  //   res.send(model)
  // })

  // router.delete('/categories/:id', async (req,res) => {
  //   await Category.findByIdAndDelete(req.params.id,req.body  )
  //   res.send({
  //     success: true
  //   })
  // })

  // router.get('/categories', async (req,res) => {
  //   const items =  await Category.find().populate('parent').limit(10)
  //   res.send(items)
  // })

  // router.get('/categories/:id', async (req,res) => {
  //   const model =  await Category.findById(req.params.id)
  //   res.send(model)
  // })

  // app.use('/admin/api', router)

  const router = express.Router({
    mergeParams:true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  router.get('/', async (req, res) => {
    const items = await req.Model.find().populate('parent').limit(10)
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource',async (req,res,next) => {
    // const modelName = require('inflection').classify(req.params.resource)
    console.log(req.params,'--')
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  } , router)
} 