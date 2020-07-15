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
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
    // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
// 资源列表
  router.get('/', async (req, res) => {
    const items = await req.Model.find().populate('parent').limit(10)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // const modelName = require('inflection').classify(req.params.resource)
    console.log(req.params, '--')
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:4400/uploads/${file.filename}`
    res.send(file)
  })


  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //1 根据用户找用户
 
    const user = await (await AdminUser.findOne({ username }).select('+password'))
    assert(user,422,'用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //2 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid,422,'密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //3 返回token
    // const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id:user.id,
      _id:user.id,
      username: user.username, 
    },app.get('secret'))
    res.send({token})
  })

  // 错误处理函数
  app.use(async(err,req,res,next) => {
    res.status(err.statusCode || 500).send({
      message:err.message
    })
  })
} 