const express = require('express')
const chalk = require('chalk')
const { Schema, model } = require('mongoose')
const multer = require('multer')
const fileMiddleware = require('./middleware/file')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.json())
app.use(fileMiddleware.single('avatar'))   //! .single('avatar')-?????




const Img_Schema = new Schema({
	images: Object
})

const Img = model('Images', Img_Schema)



// app.get('/', async (req, res) => {
// 	try {
// 		// Img.create({
// 		// 	images: '111.jpg'
// 		// })
// 	}
// 	catch (e) {
// 		console.log(chalk.red('Витя ошибка: ', e))
// 	}
// })




app.post('/', async (req, res) => {
	try {
		console.log('req.file.path: ', req.file.path)
		

		const images = await Img.create({
			images: req.file.path
		})
		await images.save()


	}
	catch (err) {
		console.log('Витя ошибка в POST: ', err)
	}
})




async function start() {
	try {
		await mongoose.connect('mongodb+srv://Victor-school:uG73dLnsUETlKVzf@cluster0.6aeiv.mongodb.net/upload-files',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			})
			.then(() => console.log(chalk.blue('--База запущена--')))
			.catch(err => console.log(err))
		app.listen(PORT, () => console.log(chalk.cyan(`:::::::::::::::........СЕРВЕР ЗАПУЩЕН (порт: ${PORT})........::::::::::::::::::`)))
	}
	catch (e) {
		console.log(chalk.red('Витя ошибка: e', e, ':ошибка---------- index.js--------start()-----'))
	}
}
start()