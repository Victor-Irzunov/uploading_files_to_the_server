
// import { upload } from './upload.js'

// upload('#file', {
//   multi: true,                                        //буду считывать ключ и если истина то загруж несколько файлов
//   accept: ['.png', '.jpg', '.jpeg', '.gif'],

//   onUpload(files, blocks) {

//     files.forEach((file, index) => {


//       //--прогресс
//       task.on('state_changed', snapshot => {                       //прослушать прогрес загрузки файла
//         const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'  //.bytesTransferred сколькоуже передали байтов   / .toFixed(0) убираем любые числа после запятой

//         const block = blocks[index].querySelector('.preview-info-progress')
//         block.textContent = percentage
//         block.style.width = percentage
//       },
//         error => {
//           console.log(error)
//         },
//         () => {                                                //вызываетсякогда загрузка файлов завершена
//           task.snapshot.ref.getDownloadURL()
//             .then(url => {
//               console.log(`%c Download URL: ${url}`, 'color: #000000; background: #ff00ff; padding: 5px; font-size: 15px; margin-top: 5px; border-radius: 2px;')
//             })
//         })
//     })
//   }
// })