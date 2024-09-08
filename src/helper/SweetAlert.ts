import Swal from 'sweetalert2/dist/sweetalert2.js'
function confirmDeletion() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true)
      }
      reject()
    })
  })
}

export { confirmDeletion }
