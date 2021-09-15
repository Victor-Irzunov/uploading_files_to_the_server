function bytesToSize_f_1(bytes) {                                     //конвектор kB

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}


//ф-ция help
const element_13 = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }
  if (content) {
    node.textContent = content
  }
  return node
}




function noop() { }

let files

function test() {
  console.log('test  files= ', files)
}

//++ старт ф-ции   => upload


//? export 

function upload(selector, options = {}) {
  files = []
  console.log("🚀  запущена ф-ция upload  let files= ", files)



  //---сохранение
  const onUpload = options.onUpload ?? noop             //??    ?? Проверка значения на undefined и null.Указание значения, используемого по умолчанию.Обеспечение того, что появление значений 0, false, и '' не приводит к использованию значения, применяемого по умолчанию.
  //-------------



  const input = document.querySelector(selector)
  const preview = element_13('div', ['preview'])           //preview - c англ. просмотр



  // const open = document.createElement('button')
  // open.classList.add('btn')
  // open.textContent = 'ОТкрыть'
  const open = element_13('button', ['btn'], 'Открыть')


  const upload = element_13('button', ['btn', 'primary'], 'Загрузить')
  upload.style.display = 'none'

  if (options.multi) {
    input.setAttribute('multiple', true)           //добавить атрибут  //multipleАтрибут является логическим атрибутом.Если он присутствует, он указывает, что пользователю разрешено вводить / выбирать более одного значения.
  }

  if (options.accept && Array.isArray(options.accept)) {                  //Array.isArray() возвращает true, если объект является массивом 
    input.setAttribute('accept', options.accept.join(','))                  //Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.
  }


  input.insertAdjacentElement('afterend', preview)                      //вставить элем после этого элемента
  input.insertAdjacentElement('afterend', upload)
  // input.insertAdjacentElement('beforebegin', open)

  document.querySelector('form[method="POST"]').insertAdjacentElement('beforebegin', open)


  const triggerInput = () => input.click()



  const changeHandler = event => {              //*changeHandler -c англ. обработчик изменений
    if (!event.target.files.length) {
      return
    }

    files = Array.from(event.target.files)                        //Array.from() создаёт новый экземпляр Array из массивоподобного или итерируемого объекта
    console.log("🚀 ф-ция changeHandler files= ", files)
    preview.innerHTML = ''
    upload.style.display = 'inline'

    files.forEach(file => {
      if (!file.type.match('image')) {                           //match () ищет в строке совпадение с регулярным выражением и возвращает совпадения в виде объекта Array.
        return
      }

      const reader = new FileReader()               //FileReader позволяет веб-приложениям асинхронно читать содержимое файлов (или буферы данных), хранящиеся на компьютере пользователя

      reader.onload = ev => {                       //FileReader.onload Обработчик для события load. Это событие срабатывает при каждом успешном завершении операции чтения.
        const src = ev.target.result
        //insertAdjacentHTML позволяет вставить строку HTML кода в любое место страницы.  //afterbegin - внутри блока
        preview.insertAdjacentHTML('afterbegin', `
          <div class="preview-image">
            <div class="preview-remove" data-name="${file.name}">&times;</div>
            <img src="${src}" alt="${file.name}" />
            <div class="preview-info">
              <span>${file.name}</span>
              ${bytesToSize_f_1(file.size)}
            </div>
          </div>
        `)
      }
      reader.readAsDataURL(file)            //readAsDataURL считывает файл и передает его содержимое как base64 строку
    })
  }



  //*удаление
  const removeHandler = event => {
    if (!event.target.dataset.name) {
      return
    }
    const { name } = event.target.dataset                            //удаляем из памяти
    files = files.filter(file => file.name !== name)
    if (!files.length) {
      upload.style.display = 'none'
    }
    const block = preview                                              //удаляем из блока
      .querySelector(`[data-name="${name}"]`)
      .closest('.preview-image')                                        //.closest - для поиска ближайшего родителя
    block.classList.add('removing')
    setTimeout(() => block.remove(), 300)
  }

  //** полоса загрузки
  const clearPreview = el => {
    el.style.bottom = '4px'
    el.innerHTML = '<div class="preview-info-progress"></div>'
  }

  const uploadHandler = () => {                                      //uploadHandler - обработчик загрузки c англ.
    preview.querySelectorAll('.preview-remove').forEach(e => e.remove())         //крестики удаляем 
    const previewInfo = preview.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview)

    onUpload(files, previewInfo)  //

    console.log('onUpload(files= ', files)
    console.log("🚀 DIV: ", previewInfo)

  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)                  //change - при потере фокуса.

  preview.addEventListener('click', removeHandler) //* удалить

  upload.addEventListener('click', uploadHandler) //* загрузить
}
// //++ конец ф-ции upload




// //--кнопка загрузить
upload('#file', {
  multi: true,                                        //буду считывать ключ и если истина то загруж несколько файлов
  accept: ['.png', '.jpg', '.jpeg', '.gif'],

  onUpload(files, blocks) {
    let xhr = new XMLHttpRequest()

    files.forEach((file, index) => {

      //--прогресс
      xhr.upload.onprogress = function (event) {                       //прослушать прогрес загрузки файла
        console.log(`%c загрузка: ${event.loaded}`, 'color: #000000; background: #808000; padding: 5px; font-size: 15px; margin-top: 5px; border-radius: 2px;')

        const percentage = ((event.loaded / event.total) * 100).toFixed(0) + '%'

        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }


      // xhr.onloadend = function () {
      //   if (xhr.status == 200) {
      //     console.log("Успех");
      //   } else {
      //     console.log("Ошибка: " + this.status);
      //   }
      // };



      xhr.open("POST", "/images", true);                              //"/images" куда загружать файл



      xhr.setRequestHeader('Content-Type', 'application/octet-stream');


      //++Вызывает функцию когда меняется состояние запроса
      xhr.onreadystatechange = function () {
        console.log(' = = = = =  = = == ')
        event = null
        if (xhr.readyState == 4) {                  //*
          if (xhr.status == 200) {
            console.log('класс')
          }
          else {
            console.log(xhr.readyState)
            console.log('Витя ошибка в состоянии запроса')
          }
        }
      }


      // var formData = new FormData();
      // formData.append("images", file);


      console.log('xhr.send(file) :', file)
      xhr.send(file)
    })
  }
})



//----------------------------------------------------------------------


