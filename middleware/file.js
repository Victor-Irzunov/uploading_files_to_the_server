//№78. Настройка загрузки файлов
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({                                                               //куда и как нам загружать файлы котор мы будем загр на сервер
	destination: function(req, file, cb) {                                                          //куда складывать файл
		cb(null, 'images')
	},
	filename: function(req, file, cb) {                                                          //как назвать файл
		cb(null, file.fieldname + '---' + Date.now() + path.extname(file.originalname))            //важно чтобы названияэтих файлов не повторялись
		// cb(null, file.originalname)            //важно чтобы названияэтих файлов не повторялись
	}
})
                                                                                               //! file.fieldname + '-' + Date.now() + path.extname(file.originalname)
// const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

// const fileFilter = (req, file, cb) => {                         //валидатор для файла
// 	if (allowedTypes.includes(file.mimetype)) {               //.mimetype если файл один из масива то валидайия пройдена
// 		cb(null, true)
// 	}
// 	else {
// 		cb(null, false)
// 	}
// }

module.exports = multer({
	storage,
	// fileFilter
})