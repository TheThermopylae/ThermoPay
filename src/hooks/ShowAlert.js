import Swal from 'sweetalert2'

export default function ShowAlert () {
  function showAlert (text, icon, background, color = '#fff', title = '') {
    Swal.fire({
      background: background,
      color: color,
      title: title,
      icon: icon,
      text: text,
      toast: true,
      position: 'top-right',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      showClass: {
        popup: `
          animate__animated
          animate__bounceInRight
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOutUp
        `
      }
    })
  }

  return showAlert
}
